const UserSchema = require("../Schemas/UserSchema");
const brcypt = require("bcrypt");
const SALT = parseInt(process.env.SALT);

const User = class {
  username;
  password;
  name;
  email;
  constructor({ name, email, password, username }) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.name = name;
  }

  registerUser() {
    return new Promise(async (resolve, reject) => {
      const hashPwd = await brcypt.hash(this.password, SALT);

      const userObj = UserSchema({
        name: this.name,
        email: this.email,
        username: this.username,
        password: hashPwd,
      });

      try {
        const userDb = await userObj.save();
        resolve(userDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  static usernameAndEmailExist({ username, email }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userExist = await UserSchema.findOne({
          $or: [{ username: username }, { email: email }],
        });
        if (
          userExist &&
          userExist.email === email &&
          userExist.username === username
        ) {
          reject("Choose a different email and username.");
        } else if (userExist && userExist.email === email) {
          reject("Email already used once, choose a different email.");
        } else if (userExist && userExist.username === username) {
          reject("Username already exists, choose a different username.");
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  static findUserWithEmailOrUsername({ usernameOrEmail }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDb = await UserSchema.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!userDb)
          reject(
            "Entered details do not match. Please check entered details. Otherwise register, if not registered"
          );
        resolve(userDb);
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = User;
