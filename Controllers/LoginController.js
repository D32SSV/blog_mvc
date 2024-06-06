const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res.send({
      status: 400,
      message: "Missing Credentials",
    });
  }
  try {
    const userDb = await User.findUserWithEmailOrUsername({ usernameOrEmail });
    // console.log(userDb.password, password);
    const passwordMatch = await bcrypt.compare(password, userDb.password);
    // console.log(passwordMatch);
    if (!passwordMatch) {
      return res.send({
        status: 400,
        message: "incorrect password",
      });
    }

    // console.log(req.session);
    req.session.isAuth = true;
    req.session.user = {
      userId: userDb._id,
      email: userDb.email,
      name: userDb.name,
    };

    return res.send({
      status: 200,
      message: "Login Success",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Wrong username or email",
      error: error,
    });
  }
  return res.send("Balle Balle");
};

module.exports = loginController;
