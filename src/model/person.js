const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "manager", "waiter"],
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});
const person = mongoose.model("Person", personSchema);
module.exports = person;
