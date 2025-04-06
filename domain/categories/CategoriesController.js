const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("CATEGORIES")
});

router.get("/admin/categories", (req, res) => {
    res.send("CREATE NEW CATEGORY")
});

module.exports = router;