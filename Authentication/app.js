var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var passport        = require("passport");
var bodyParser      = require("body-parser");
var LocalStrategy   = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User            = require("./models/user");
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine","ejs");

app.use(require("express-session")({
    secret : "weiwei is a good girl",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended : true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//====================
// routes
//====================

app.get("/register", function(req, res) {
    res.render("register");
})

// handling user sign up
app.post("/register", function(req, res) {
    
    User.register(new User({username : req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            })   
        }
    })
})

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
})

// ===============
// Login Routes
// ===============

app.get("/login", function(req, res) {
    res.render("login")
})


// middle ware  something before turn back data
app.post("/login", passport.authenticate("local", {
    successRedirect : "/secret",
    failureRedirect : "/login"
}), function(req, res) {
    
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) { // next thing to be called
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started...");
})