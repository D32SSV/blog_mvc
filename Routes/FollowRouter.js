const express = require("express");
const follow = require("../Controllers/FollowControllers/FollowController");
const FollowRouter = express.Router();

FollowRouter.post("/follow-user", follow)



module.exports = FollowRouter