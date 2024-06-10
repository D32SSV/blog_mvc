const BlogSchema = require("../Schemas/BlogSchema");
const { LIMIT } = require("../privateConstants");
const ObjectId = require("mongodb").ObjectId;


const createBlog = ({ title, textBody, creationDateTime, userId }) => {
  return new Promise(async (resolve, reject) => {
    // console.log(title, textBody, creationDateTime, userId);
    const blogObj = new BlogSchema({
      title,
      textBody,
      creationDateTime,
      userId,
    });
    try {
      const blogDb = await blogObj.save();
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogs = ({ SKIP }) => {
  //paginatin , sort
  return new Promise(async (resolve, reject) => {
    try {
      const blogDb = await BlogSchema.aggregate([
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $facet: { data: [{ $skip: SKIP }, { $limit: LIMIT }] },
        },
      ]);
      resolve(blogDb[0].data);
    } catch (error) {
      reject(error);
    }
  });
};

const getMyBlog = ({ SKIP, userId }) => {
  //pagination, sort, match
  return new Promise(async (resolve, reject) => {
    try {
      const myBlogsDb = await BlogSchema.aggregate([
        {
          $match: { userId: userId },
        },
        { $sort: { creationDateTime: -1 } },
        {
          $facet: { data: [{ $skip: SKIP }, { $limit: LIMIT }] },
        },
      ]);
      resolve(myBlogsDb[0].data);
    } catch (error) {
      reject(error);
    }
  });
};

const getBlogWithId = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!ObjectId.isValid(blogId)) reject("Invalid Blog Id");

      const blogDb = await BlogSchema.findOne({ _id: blogId });
      if (!blogDb) reject(`No Blog found with blogId:${blogId}`);
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createBlog, getAllBlogs, getMyBlog, getBlogWithId };
