const { getAllBlogs } = require("../../Models/BlogModel");

const GetBlog = async (req, res) => {
  const SKIP = parseInt(req.query.skip) || 0;
  try {
    const blogDb = await getAllBlogs({ SKIP });
    if (blogDb.length === 0) {
      return res.send({
        status: 400,
        message: "No More Blogs",
      });
    }
    return res.send({
      status: 201,
      message: "Data fetch success",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Data fetch failed",
      error: error,
    });
  }
};

module.exports = GetBlog;
