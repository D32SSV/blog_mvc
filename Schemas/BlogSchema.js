const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  textBody: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 1000,
  },
  creationDateTime: {
    type: String,
    requried: true,
  },
  userId: {
    type: Schema.Types.ObjectId, //foreign key to user
    required: true,
    ref: "user",
  },
});

module.exports = mongoose.model("blog", blogSchema);
