//  all the middle ware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "campground not found.. !")
                res.redirect("back");
            } else if (!foundCampground.author.id.equals(req.user.id)) {
                req.flash("error", "you don't have permission !")
                res.redirect("back");
            } else {
               next();
            }
        })
    } else {
        req.flash("error", "this is not your campground, you don't have permission !")
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else if (!foundComment.author.id.equals(req.user.id)) {
                res.redirect("back");
            } else {
               next();
            }
        })
    } else {
        req.flash("error", "You don't have permission to do that.")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First !")
    res.redirect("/login");
}


module.exports = middlewareObj