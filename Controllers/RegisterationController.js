const User = require("../Models/UserModel");
const { validateRegisterData } = require("../Utils/AuthUtil");

const registerationController = async (req, res) => {
  const { name, email, username, password } = req.body;
  //clean data
  try {
    await validateRegisterData({ name, email, username, password });
  } catch (error) {
    res.send({
      status: 400,
      message: "user data error",
      error: error,
    });
  }

  try {
    User.usernameAndEmailExist({ email, username }); //check if username || email already exist
    const obj = new User({ name, email, username, password });
    const userDb = await obj.registerUser();
    return res.send({
      status: 201,
      message: "Registration success",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "DB Error",
      error: error,
    });
  }
  // res.send("All Ok Bro ++");
};

module.exports = registerationController;
