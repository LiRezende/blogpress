const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users })
    });
});

router.get("/admin/user", (req, res) => {
    res.render("admin/users/create")
});

router.post("/admin/user", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where:{email:email}}).then(user => {
        if(user == undefined) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                name: username,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((error) => {
                console.log(error);
                res.redirect("/");
            });
        } else {
            return res.send(`
                <script>
                  alert('E-mail já cadastrado!');
                  window.location.href = '/admin/user';
                </script>
            `);
        }
    });
});

module.exports = router;