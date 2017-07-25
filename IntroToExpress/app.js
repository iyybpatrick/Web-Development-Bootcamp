console.log("hello");

var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("hi there !");
});


app.get("/bye", function(req, res) {
    console.log("this is a test");
   res.send("bye bye"); 
});

app.get("/r/:subreditName", function(req, res) {
    res.send("welcome to subredit haha");
});

app.get("/r/:subreditName/comments/:id/:title/", function(req, res) {
    res.send("this is a comment !!");
    console.log(req.params);
})
app.get("*", function(req, res) {
    res.send("You are a start");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
});