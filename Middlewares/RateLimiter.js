const AccessSchema = require("../Schemas/AccessSchema");

const rateLimiter = async (req, res, next) => {
  //   console.log(req.session.id);
  const sessionId = req.session.id;
  try {
    const accessDb = await AccessSchema.findOne({ sessionId: sessionId });
    // console.log(accessDb);

    //If entry not present , create an entry in the DB for the first request
    if (!accessDb) {
      const accessObj = new AccessSchema({
        sessionId: sessionId,
        time: Date.now(),
      });
      await accessObj.save();
      next();
      return;
    }


    //Nth request time check
    const diff = Date.now() - accessDb.time;
    //1 request per 5 second
    if (diff < 5000) {
      return res.send({
        status: 400,
        message: "Too many requests, please wait for some time",
      });
    }
    await AccessSchema.findOneAndUpdate({
      sessionId: sessionId,
      time: Date.now(),
    });
    next();
  } catch (error) {
    return res.send({
      status: 500,
      message: "DB error",
      error: error,
    });
  }
};

module.exports = rateLimiter;
