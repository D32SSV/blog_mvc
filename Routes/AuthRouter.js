const express = require("express");

//file import
const registerationController = require("../Controllers/RegisterationController");
const loginController = require("../Controllers/LoginController");
const isAuth = require("../Middlewares/isAuth");
const logoutController = require("../Controllers/LogoutController");

const AuthRouter = express.Router();

AuthRouter.post("/register", registerationController);
AuthRouter.post("/login", loginController);

AuthRouter.post("/logout", isAuth, logoutController)


module.exports = AuthRouter