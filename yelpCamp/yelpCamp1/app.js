var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds"),
    Comment      = require("./models/comment"),
    passport     = require("passport"),
    localStrategy= require("passport-local"),
    User         = require("./models/user"),
    methodOverride = require("method-override"),
    flash        = require("connect-flash")
    
// requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
    
// seedDB();// seed the data base


    
// mongoose.connect("mongodb://localhost/yelp_camp1")
mongoose.connect("mongodb://yuebin:i86929271@ds051868.mlab.com:51868/yuebin_yelpcamp");
app.set("view engine", "ejs")

// passport configuration
app.use(require("express-session") ({
    secret : "Wei wei is cute",
    resave : false,
    saveUninitialized : false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// to every single user
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("yelpCamp has started !");  
});