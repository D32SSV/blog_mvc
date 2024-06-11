const { getBlogWithId, deleteBlog } = require("../../Models/BlogModel");
const User = require("../../Models/UserModel");

const DeleteBlog = async (req, res) => {
  const  blogId  = req.body.blogId;
  const userId = req.session.user.userId;

  if (!blogId) {
    return res.send({
      status: 400,
      message: "not found",
    });
  }

  try {
    await User.verifyUserId({ userId });
  } catch (error) {
    return res.send({
      status: 500,
      message: "user not found",
      error: error,
    });
  }

  try {
    const blogDb = await getBlogWithId({ blogId });
    if (!blogDb.userId.equals(userId)) {
      return res.status(400).json("auth failed, not allowed to delete");
    }
    const currentBlog = await deleteBlog({ blogId });
    return res.status(200).json("Deleted successfully");
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "DAB error",
      error: error,
    });
  }
};

module.exports = DeleteBlog;
