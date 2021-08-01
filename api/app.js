// We are importing express with this information
const express = require('express')
// Here we are initializing the application
const app = express();
const Post = require("./models/posts")
// this will initialize our object
const postData = new Post()
const posts = [{
        "id": "1581461442206",
        "title": "This is a New Blog Post",
        "content": "This is the content! ",
        "post_image": "uploads/post-image-1581461442199.jpg",
        "added_date": "1581461442206"
    }]



app.get("/api/posts", (req, res) => {
    res.status(200).send(posts);
})

// Here we are initializing the server
app.listen(3000, () => console.log("Listening on http://localhost:3000"));