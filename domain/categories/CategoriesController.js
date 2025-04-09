const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/category", (req, res) => {
    res.render("admin/categories/new")
});

router.post("/admin/category", (req, res) => {
    var title = req.body.title;
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title.toLowerCase())
        }).then(() => {
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect("/admin/category");
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", { categories })
    })
});

router.delete('/admin/category/:id', async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      await Category.destroy({
        where: { id: categoryId }
      });
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      res.sendStatus(500);
    }
});

router.get('/admin/category/:id', async (req, res) => {
    const categoryId = req.params.id;

    if(isNaN(categoryId)) {
        res.redirect("/admin/categories");
    }
  
    try {
      const category = await Category.findByPk(categoryId);
      
      if (category) {
        res.render("admin/categories/edit", { category });
      } else {
        res.redirect("/admin/categories");
      }
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      res.sendStatus(500);
    }
});

router.put('/admin/category', async (req, res) => {
    const categoryId = req.body.id;
    const categoryTitle = req.body.title;
  
    try {
      await Category.update(
        { 
            title: categoryTitle,
            slug: slugify(categoryTitle.toLowerCase())
        },
        { where: { id: categoryId } }
      );
  
      res.redirect("/admin/categories");
    } catch (error) {
      res.sendStatus(500);
    }
});

module.exports = router;