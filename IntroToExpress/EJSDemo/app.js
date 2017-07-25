var express = require("express")
var app = express();

// app.use(express.static("public"));

app.set("view engine", "ejs");

// app.get("/:thing", function(req, res) {
//   var thing = req.params.thing;
//     res.render("home.ejs", {thingVar : thing});
// });
app.get("/", function(req, res) {
    res.render("home");
})
app.get("/posts", function(req, res) {
    var posts = [
        {title : "yuebin", author : "yuebin"},
        {title : "weiwei", author : "weiwei"}
        ];
        res.render("posts", {posts : posts});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
});