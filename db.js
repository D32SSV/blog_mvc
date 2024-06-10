const mongoose = require("mongoose");
const Mongo_URI = process.env.Mongo_URI;

mongoose
  .connect(Mongo_URI)
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.log(err);
  });
