const { getMyBlog } = require("../../Models/BlogModel");

const MyBlog = async (req, res) => {
  const SKIP = parseInt(req.query.skip) || 0;
  const userId = req.session.user.userId;

  try {
    const myBlogsDb = await getMyBlog({ SKIP, userId });
    if (myBlogsDb.length === 0) {
        return res.send({
          status: 400,
          message: "No More Blogs",
        });
      }
    return res.send({
      status: 201,
      message: "All Ok",
      data: myBlogsDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Data fetch failed",
      error: error,
    });
  }
};

module.exports = MyBlog;
