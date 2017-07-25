var express = require("express")

var app = express();


app.get("/", function(req, res) {
    res.send("hello, welcome to my assignment !");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig : "Oink",
        dog : "Woof",
        goldfish : "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("the " + animal +" says" + sound);
});

app.get("/repeat/:message/:time", function(req, res) {
    var message = req.params.message;
    var time = Number(req.params.time);
    var result = "";
    for (var i = 0; i < time; i++) {
        result += message +" ";
    }
    res.send ("the Message: " + result);
}) 

app.get("*", function(req, res) {
    res.send("sorry, page not found..");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
});