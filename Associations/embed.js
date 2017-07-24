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
    posts : [postSchema]
})

var User = mongoose.model("User",userSchema);


// //  new post

// var newPost = new Post({
//     title : "this is a new post",
//     content : "hahahaha this is the content"
// })

// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


// // new user 
 
// var newUser = new User({
//     email : "weiwei@gmail.com",
//     name : "weizhang"
// })

// newUser.posts.push({
//     title : "how to cry ?",
//     content : "just cry"
// })

// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user)
//     }
// });


User.findOne({ name : "weizhang"}, function(err, user) {
    if (err) {
        console.log(err) 
    } else {
        user.posts.push({
            title : "don't cry ok ?",
            content : "ok ,guai"
        })
        user.save(function(err, user) {
            if (err) {
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})