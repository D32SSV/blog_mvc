const { followUser } = require("../../Models/FollowModel");
const User = require("../../Models/UserModel");

const follow = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;

  if (followerUserId.toString() === followingUserId.toString()) {
    return res.send({
      status: 400,
      message: "Can not process the request",
    });
  }

  try {
    await User.verifyUserId({ userId: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Follower UserId not found",
    });
  }

  try {
    await User.verifyUserId({ userId: followingUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Following UserId not found",
    });
  }

  try {
    const followDb = await followUser({ followerUserId, followingUserId });
    return res.send({
        status:200,
        message:"Followed successfully",
        data:followDb
    })
  } catch (error) {
    return res.send({
        status:500,
        message:"Could not follow, DB Error",
        error:error
    })
  }
  return res.send("Sdkjfskldjf");
};

module.exports = follow;
