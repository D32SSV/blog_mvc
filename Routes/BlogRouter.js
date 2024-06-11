const express = require("express");
const CreateBlog = require("../Controllers/BlogControllers/CreateBlog");
const GetBlog = require("../Controllers/BlogControllers/GetBlog");
const MyBlog = require("../Controllers/BlogControllers/MyBlog");
const EditBlog = require("../Controllers/BlogControllers/EditBlog.js");
const DeleteBlog = require("../Controllers/BlogControllers/DeleteBlog.js");

const BlogRouter = express.Router();

BlogRouter.post("/create-blog", CreateBlog);

// /get-blog?skip=3
BlogRouter.get("/get-blog", GetBlog);

// /my-blog?skip=3
BlogRouter.get("/my-blog", MyBlog);

BlogRouter.post("/edit-blog", EditBlog);

BlogRouter.post("/delete-blog", DeleteBlog);


module.exports = BlogRouter;
