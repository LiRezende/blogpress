const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("ARTICLES")
});

router.get("/admin/articles", (req, res) => {
    res.send("CREATE NEW ARTICLE")
});

module.exports = router;