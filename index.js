const express = require("express");
require("dotenv").config();
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY;
const Mongo_URI = process.env.Mongo_URI;

//file import
const db = require("./db");
const AuthRouter = require("./Routes/AuthRouter");

const app = express();


const store = new mongoDbSession({
  uri: Mongo_URI,
  collection: "sessions",
});

//middleware
app.use(express.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", (req, res) => {
  res.send("server OKK");
});

app.use("/auth", AuthRouter);


app.listen(PORT, () => {
  console.log(`server Ok runing on ${PORT}`);
});
