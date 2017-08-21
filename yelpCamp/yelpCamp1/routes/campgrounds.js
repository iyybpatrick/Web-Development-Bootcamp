var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")

//  index -- show all campgrounds
router.get("/", function(req, res) {
    // res.render("campgrounds", {campgrounds : campgrounds});
    // get campgrounds from db
    Campground.find({}, function(err,allcampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds : allcampgrounds, currentUser : req.user });
        }
    })
})

// create -- add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form
    // add to campground array
    // redirect back to campground page.
    var author = {
        id :req.user._id,
        username : req.user.username
    }
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newcampground = {name : name, image : image, description : desc, author : author};
    // campgrounds.push(newcampground);
    
    Campground.create(newcampground, function(err, newlyCreated) {
        if (err) {
            console.log(err) 
        } else {
            res.redirect("/campgrounds");
        }
    })
    // create a new campground and save it to db
    // res.redirect("/campgrounds");
})


// new --  show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

//show -- shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided id
    // render it to SHOW
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
       if (err) {
           console.log(err);
       } else {
          console.log(foundCamp);
           res.render("campgrounds/show",{campground : foundCamp});    
       }
    });
})

// edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    // if user logged in ? 
       Campground.findById(req.params.id, function(err, foundCampground) {
           if (err) {
              req.flash("error", err); 
           } else {
            res.render("campgrounds/edit",{campground : foundCampground});    
           }
       })
})

// update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the corrent campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership , function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

 
module.exports = router;
