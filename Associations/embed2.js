var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");


// post - title, content

var postSchema = new mongoose.Schema({
    title : String,
    content : String
});

var Post = mongoose.model("Post", postSchema);

// user - email, name

var userSchema = new mongoose.Schema({
    email : String,
    name : String,
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
     ]
})

var User = mongoose.model("User",userSchema);

User.create({
    email : "yuebin@gamil.com",
    name :"yuebin"
});

Post.create({
    title : "how to cook the best  Pt. 2 ? ",
    content : "ballala hahah"
},function (err, post) {
    User.findOne({email :"yuebin@gmail.com"}, function (err, foundUser) {
    
        foundUser.posts.push(post);
        foundUser.save(function(err, data) {
            console.log(data);
        })
    })
})

// User.findOne({ name : "weizhang"}, function(err, user) {
//     if (err) {
//         console.log(err) 
//     } else {
//         user.posts.push({
//             title : "don't cry ok ?",
//             content : "ok ,guai"
//         })
//         user.save(function(err, user) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(user)
//             }
//         })
//     }
// })