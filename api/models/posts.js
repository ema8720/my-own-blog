// create a path
const PATH = "./data.json"
const fs = require("fs");

class Post {
    get() {
        // Get Post
        return this.readData()
    }

    getIndividualBlog(postId) {
        // Get One Blog Post
        const posts = this.readData()
        const foundPost = posts.find((post) => 
             post.id === postId
             
        )
        return foundPost 
        
    }
    add(newPost) {
        // Add
        const currentPost = this.readData();
        currentPost.unshift(newPost);
        this.storeData(currentPost);
    }

    readData() {
        let rawData = fs.readFileSync(PATH)
        let posts = JSON.parse(rawData);
        return posts
    }
    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }

}
//  here we are exporting the module.
module.exports = Post