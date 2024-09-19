const mongoose = require("mongoose");
const mongoUrl =
  "mongodb://127.0.0.1:27017/";
// const mongoUrl = "mongodb://localhost:27017";

const conn =  mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});
    
db.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnect");
});
module.exports = db;

// const mongoose = require('mongoose');

// module.exports = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URL, {});
//         console.log("CONNECTED TO DATABASE SUCCESSFULLY");
//     } catch (error) {
//         console.error('COULD NOT CONNECT TO DATABASE:', error.message);
//     }
// };
