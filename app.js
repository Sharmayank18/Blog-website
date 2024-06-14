//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
async function run() {
  await mongoose.connect("mongodb+srv://Mayank:4UsL.uQykjhsqtY@mydbs.uxo3zsu.mongodb.net/?retryWrites=true&w=majority").catch(error => handleError(error));
}
run();
const _ = require('lodash');
const { lowerCase, truncate } = require("lodash");

const posts = [];
const aboutContent = "Hi! This is Mayank Sharma and here i am presenting a blog site to you for storing your blogs .. open for all the recommendations "
const contactContent = "Mail me at : sharmayank18@gmail.com ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*- 

//model 

const postSchema = {
  title: String,
  data: String
};

const Post = mongoose.model("Post", postSchema);

const postStoreSchema = {
  postArray: [postSchema]
};

const PostStore = mongoose.model("poststorage", postStoreSchema);

const postArr = new PostStore({
  postArray: []
});

// -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*-  -*- 

app.get("/", function (req, res) {
  res.render("home", { postArray: postArr.postArray });
});


app.get("/about", function (req, res) {
  res.render("about", { startingContent: aboutContent });
});


app.get("/contact", function (req, res) {
  res.render("contact", { startingContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:newpost", function (req, res) {      // for dynamic express routing 
  const dest = req.params.newpost;

  postArr.postArray.forEach(function (post) {
    if (lowerCase(post.title) == lowerCase(dest)) {
      res.render("post", { newtitle: post.title, newbody: post.data});
    }
  });

});

app.post("/compose", function (req, res) {
  const newPost = {
    title: req.body.newPostTitle,
    body: req.body.newPostBody,
  };
  
  const newpost = new Post({
    title: req.body.newPostTitle,
    data: req.body.newPostBody
  });

  postArr.postArray.push(newpost);
  postArr.save();
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
