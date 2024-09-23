const express = require("express");
const app = express();
const db = require('../config/db.js');
require("dotenv").config();

const PORT = process.env.PORT || 3000
const personRoutes   = require('../routes/PersonRoutes.js');
const menuRoutes = require("../routes/MenuRoutes.js");

app.get("/", function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
  console.log("Server is running port " + PORT);
});
