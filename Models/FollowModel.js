const FollowSchema = require("../Schemas/FollowSchema");

const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isFollowing = await FollowSchema.findOne({
        followerUserId,
        followingUserId,
      });
      if (isFollowing) return reject("Already following");
      const followObj = new FollowSchema({
        followerUserId,
        followingUserId,
        creationDateTime: Date.now(),
      });
      const followDb = await followObj.save();
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { followUser };
