// We are importing express with this information
const express = require('express')
// Here we are initializing the application
const app = express();
const Post = require("./models/posts")
// this will initialize our object
const postData = new Post()

// setup on app.js Allow_Control-Access-Origin
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next(); // 
})

// set up another middleware for only uploads
app.use('/uploads', express.static('uploads'))

app.get("/api/posts", (req, res) => {
    res.status(200).send(postData.get());  
})


app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    // console.log(postId);
    const foundPost = postData.getIndividualBlog(postId)
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send("Post not found")
    }
})

// Here we are initializing the server
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
