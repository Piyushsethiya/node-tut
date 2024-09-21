const express = require("express");
const router = express.Router();
const person = require("../model/person");

// const bodyParser = require('body-parser');
// router.use(bodyParser.json);
  
// Add
router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

// fetch
router.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data find successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

//  fetch with parameter
router.get("/person/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    // console.log(worktype);
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

module.exports = router;