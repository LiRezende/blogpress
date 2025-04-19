function adminAuth(req, res, next) {
    if(req.session.loggedUser != undefined) {
        next();
    } else {
        res.redirect("/admin/login");
    }
}

module.exports = adminAuth;