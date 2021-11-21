var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.oidc.isAuthenticated());
  if (req.oidc.isAuthenticated()) {
    // console.log("hiiii");
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});
router.get("/home", function (req, res, next) {
  res.render("index", {
    title: "oanh ne",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

module.exports = router;
