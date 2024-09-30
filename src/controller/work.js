const express = require("express");
const app = express();
const db = require("../config/db.js");
require("dotenv").config();

const personRoutes = require("../routes/PersonRoutes.js");
const menuRoutes = require("../routes/MenuRoutes.js");


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


const passport = require("../config/auth.js");
app.use(passport.initialize());
const auth = passport.authenticate("local", { session: false });

// routes
app.get("/", function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running port " + PORT);
});

module.exports = logRequest;
