const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    })
    .then(articles => {
        res.render("admin/articles/index", { articles });
    });
});

router.get("/admin/article", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories })
    })
});

router.post("/admin/article", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category;

    if(title != undefined) {
        Article.create({
            title: title,
            body: body,
            categoryId: categoryId,
            slug: slugify(title.toLowerCase())
        }).then(() => {
            res.redirect("/admin/articles");
        })
    } else {
        res.redirect("/admin/article");
    }
});

router.delete('/admin/article/:id', async (req, res) => {
    const articleId = req.params.id;
  
    try {
      await Article.destroy({
        where: { id: articleId }
      });
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro ao excluir o artigo:', error);
      res.sendStatus(500);
    }
});

module.exports = router;