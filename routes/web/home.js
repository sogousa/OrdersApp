const express = require("express");
const passport = require("passport");
const User = require("../../models/user");
const router = express.Router();

router.get("/", function (req, res) {
   res.render("home/", {customers: [],  orders: []});
});

router.get("/login", function (req, res) {
   res.render("home/login")
});

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/home");
});

router.get("/home", function (req, res) {
    res.render("home/home");
 });
 
router.post("/login", passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/login",
   failureFlash: true
}));

router.get("/signup", function (req, res) {
   res.render("home/signup")
});

router.post("/signup", function (req, res, next) {
   let username = req.body.username;
   let email = req.body.email;
   let password = req.body.password;

   User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err); }
      if (user) {
         req.flash("error", "Account exists with this email");
         return res.redirect("/signup");
      }

      const newUser = new User({
         username: username,
         password: password,
         email: email
      });
      
      newUser.save(next);

   });

}, passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/signup",
   failureFlash: true
}));

module.exports = router;