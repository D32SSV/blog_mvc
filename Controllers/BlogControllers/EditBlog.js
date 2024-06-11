const { getBlogWithId, updateBlog } = require("../../Models/BlogModel");
const User = require("../../Models/UserModel");
const blogDataValidation = require("../../Utils/BlogUtil");

const EditBlog = async (req, res) => {
  const { title, textBody } = req.body.data;
  const blogId = req.body.blogId;
  const userId = req.session.user.userId;

  try {
    //data-validation
    await blogDataValidation({ title, textBody });
    //verify user-id
    await User.verifyUserId({ userId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Data Error",
      error: error,
    });
  }

  try {
    const blogDb = await getBlogWithId({ blogId });
    // console.log(blogDb);

    if (!userId.equals(blogDb.userId)) {
      return res.send({
        status: 403,
        message: "Not allowed to edit this blog, Authorization failed",
      });
    }

    const diff = (Date.now() - blogDb.creationDateTime) / (1000 * 60);

    if (diff > 30) {
      return res.send({
        status: 400,
        message: "Not allow to edit after 30 mins of creation",
      });
    }
    const prevBlog = await updateBlog({ title, textBody, blogId });
    return res.send({
      status: 200,
      message: "Blog update success!",
      data: prevBlog,
    });
  } catch (error) {
    // console.log(error);
    return res.send({
      status: 500,
      message: "DAB Error",
      error: error,
    });
  }
  res.send("edit-blog All Ok");
};

module.exports = EditBlog;
