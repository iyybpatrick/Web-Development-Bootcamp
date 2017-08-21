var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
var data = [
    {name : "pikapi 1", 
    image : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493742614923&di=d372d7e44426815d06b904c3ddc93d8d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2F966aca07982ac6bc7a8947e6.jpg",
    description : "Camp Crystal Lake, also known as Camp Forest Green, and, more commonly as Camp Blood, is a summer camp for kids located in Crystal Lake, Cunningham County, New Jersey. A great place for young teens to find themselves...in pieces."
   },
   
   {name : "pika 2", 
    image : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493742615214&di=2b9416fcf4fffe873e7923c0fd137725&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc494b9824c511728b47102814.jpg",
    description : "Camp Crystal Lake, also known as Camp Forest Green, and, more commonly as Camp Blood, is a summer camp for kids located in Crystal Lake, Cunningham County, New Jersey. A great place for young teens to find themselves...in pieces."
   },
   {name : "pika 3", 
    image : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493742615214&di=d20d5fe0302374eb0c88906731f84698&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201507%2F06%2F20150706081835_cCdVt.jpeg",
    description : "Camp Crystal Lake, also known as Camp Forest Green, and, more commonly as Camp Blood, is a summer camp for kids located in Crystal Lake, Cunningham County, New Jersey. A great place for young teens to find themselves...in pieces."
   }
]  
    
function seedDB() {
    Campground.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed campgrounds !")
        // // add a few campgrounds
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             // create a comment
        //             Comment.create({
        //                 text : "she is cute",
        //                 author : "weiwei"
        //             }, function (err, comment) {
        //                 if (err) {
        //                     console.log(err)
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("created a new comment")
        //                 }
                        
        //             });
        //         }
        //     });
        // });
    });  
    
        
        
    // add a few comments
}

// add a few campgrounds

module.exports = seedDB;

