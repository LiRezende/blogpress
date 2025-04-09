const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const connection = require("./database/database");
const categoriesController = require("./domain/categories/CategoriesController");
const articlesController = require("./domain/articles/ArticlesController");
const Article = require("./domain/articles/Article");
const Category = require("./domain/categories/Category");

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

app.get("/", (req, resp) => {
    resp.render("index");
})

app.use("/", categoriesController);
app.use("/", articlesController);

app.listen(8080, () => {
    console.log("Server running!");
})
