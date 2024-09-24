const express = require("express");
const app = express();
const db = require("../config/db.js");
const person = require("../model/person.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const personRoutes = require("../routes/PersonRoutes.js");
const menuRoutes = require("../routes/MenuRoutes.js");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // middleware

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); // move on to the next phase
};
app.use(logRequest); // middleware

passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      console.log("Received Credentials: ", USERNAME, PASSWORD);
      const user = await person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username." });
      }
      const isPasswordMatch = user.passport === PASSWORD ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      }else{
        return done (null, false, {message: 'password incorrect.'});
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());
const auth = passport.authenticate('local', {session: false});

app.get("/", auth, function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Server is running port " + PORT);
});

module.exports = logRequest;
