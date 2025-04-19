const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const connection = require("./database/database");
const categoriesController = require("./domain/categories/CategoriesController");
const articlesController = require("./domain/articles/ArticlesController");
const usersController = require("./domain/users/UsersController");
const Article = require("./domain/articles/Article");
const Category = require("./domain/categories/Category");
const User = require("./domain/users/User");

// Sessions
app.use(session({
  secret: "alohomorra",
  cookie: { maxAge: 300000000 }
}));

// View engine
app.set("view engine", "ejs");

// Public resources
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method override
app.use(methodOverride('_method'));

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Sucesso!")
    }).catch((error) => {
        console.log(error)
    })

app.get("/", async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [{ model: Category }],
            order: [["id", "DESC"]],
            limit: 5
        });
    
        const categories = await Category.findAll();
            res.render("index", { articles, categories });
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});
    
app.get("/:slug", (req, res) => {
    const slug = req.params.slug;
    Article.findOne({
        where: { slug }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article, categories})
            })
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    const slug = req.params.slug;
  
    Category.findOne({
      where: { slug },
      include: [{
        model: Article,
        include: [Category]
      }]
    }).then(category => {
      if (category != undefined) {
        Category.findAll().then(categories => {
          res.render("index", {
            categories,
            articles: category.articles
          });
        });
      } else {
        res.redirect("/");
      }
    }).catch(error => {
      console.log(error);
      res.redirect("/");
    });
});

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.listen(8080, () => {
    console.log("Server running!");
})
