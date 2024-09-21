const express = require("express");
const app = express();
const db = require('./db.js');
console.log('It is in ')
const bodyParser = require('body-parser');
app.use(bodyParser.json);

// const personRoutes   = require('./src/routes/PersonRoutes.js');
// const menuRoutes = require("./src/routes/MenuRoutes.js");

app.get("/", function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});
// app.use('/person', personRoutes);
// app.use('/menu', menuRoutes);

app.listen(3000, () => {
  console.log("Server is running port 3000");
});
