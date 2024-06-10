const {createBlog} = require("../../Models/BlogModel");
const User = require("../../Models/UserModel");
const blogDataValidation = require("../../Utils/BlogUtil");

const CreateBlog = async (req, res) => {
  // console.log("Nahi chal rha");
  const { title, textBody } = req.body;
  const userId = req.session.user.userId;
  const creationDateTime = Date.now();

  try {
    await blogDataValidation({ title, textBody });
  } catch (error) {
    return res.send({
      status: 401,
      message: "Blog Data error",
      error: error,
    });
  }

  try {
    User.verifyUserId({ userId });
  } catch (error) {
    return res.send({
      status: 401,
      error: error,
    });
  }

  try {
    const blogDb = await createBlog({
      title,
      textBody,
      creationDateTime,
      userId,
    });
    return res.send({
      status: 201,
      message: "Blog Created Successfully",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "DB Error",
      error: error,
    });
  }
};

module.exports = CreateBlog;
