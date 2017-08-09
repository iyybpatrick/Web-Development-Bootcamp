var express     = require("express"),
bodyParser      = require("body-parser"),
methodOverride  = require("method-override"),
expressSanitizer= require("express-sanitizer"),
mongoose        = require("mongoose"),
app             = express();

mongoose.connect("mongodb://localhost/restful_blog_app");

// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// mongoose model config
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created :  {type : Date, default : Date.now }
});
//  title
//  image
//  body
//  created

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title : "weiwei",
//     image : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493647601814&di=726947c3d1d8e435978a3afcd24fb4a9&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523113013_VPaj2.jpeg",
//     body : "hello this is a blog post"
// })

// RESTful routes

app.get("/", function(req, res) {
    res.redirect("/blog");
})

app.get("/blog", function (req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs : blogs})
        }
    })
});

// new route
app.get("/blog/new", function (req, res) {
    res.render("new");
});

// create route
app.post("/blog", function(req, res) {
    // create blog 
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new")
        } else {
            // then redirect to index 
            res.redirect("/blog");
        }
    })
    
});

// show
app.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.render("show", {blog : foundBlog});
        }
    })
})

// edit route
app.get("/blog/:id/edit",function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blog");
        } else {
             res.render("edit", {blog : foundBlog});
        }
    })

})

// update route
app.put("/blog/:id", function(req , res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blog")
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    })
})

// delete route
app.delete("/blog/:id", function(req, res) {
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    })
    // redirect somewhere
})

app.listen(process.env.PORT, process.env.IP,function() {
    console.log("the blog server has started...");
})