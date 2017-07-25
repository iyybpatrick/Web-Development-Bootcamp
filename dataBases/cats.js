var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name : String,
    age : Number,
    temperament : String
});

var cat = mongoose.model("cat", catSchema);


// var xiaozhu = new cat( {
//     name : "bingou",
//     age : 100,
//     temperament : "handsome"
// });

// xiaozhu.save(function(err, cat) {
//     if (err) {
//         console.log("something went wrong !")
//     } else {
//         console.log("we saved it !!");
//         console.log(cat);
//     }
// });



// create a cat
 
 cat.create({
    name : "kedaya",
    age : 15,
    temperament : "cute"
 }, function (err, cat) {
     if (err) {
         console.log("error while creating..");
         console.log(err);
     } else {
         console.log(cat);
     }
 });
 
 // retrieve cats
 
 cat.find({}, function(err, cat) {
     if (err) {
     console.log("error while retriving.. !")
     console.log(err);
     } else {
         console.log("All the cats !!");
         console.log(cat);
     }
 })
 
