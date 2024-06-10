const blogDataValidation = ({ title, textBody }) => {
  return new Promise((resolve, reject) => {
    if (!title || !textBody) {
      reject("Include Title and Description");
    }
    if (typeof title !== "string") return reject("Title should be a string");
    if (typeof textBody !== "string")
      return reject("Description should be a string");

    resolve();
  });
};

module.exports = blogDataValidation