// We are importing express with this information
const express = require('express')
// Here we are initializing the application
const app = express();
const Post = require("./models/posts")
// We are importing multer 
var multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}` )
    }
  })

const getExt = (mimeType) => {
    switch(mimeType) {
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
    }
 }


var upload = multer({storage: storage});
// this will initialize our object
const postData = new Post()

// This will convert json into a javascript object that we can use later on in any way that we want
app.use(express.json())

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
});

// creat endpoint for adding the api post
app.post("/api/posts", upload.single("post-image"), (req, res) => {
    console.log(req.body);
    console.log(req.file)
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    postData.add(newPost)
    res.status(201).send("ok")
})



// Here we are initializing the server
app.listen(3000, () => console.log("Listening on http://localhost:3000"));


