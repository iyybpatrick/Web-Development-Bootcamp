var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var passport = require("passport");
var User = require("../models/user");


// show root route 
router.get("/", function(req, res) {
    res.render("landing");
})

// ===============
// auth routes
// ===============

// show register
router.get("/register", function(req, res) {
    res.render("register");
})


// handle sign up logic
router.post("/register", function(req, res) {
    User.register(new User({username : req.body.username}), req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message)
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome ！ " + user.username)
           res.redirect("/campgrounds"); 
        });
        
    })
})

// show login form
router.get("/login", function(req, res) {
    res.render("login")
})

// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}), function(req, res) {
    
})

// add logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
})

module.exports = router;