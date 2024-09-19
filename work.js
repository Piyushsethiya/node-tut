const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const db = require("./db");
const person = require("./src/model/person.js");
const menuItem = require("./src/model/menuItem.js");

const personRoutes = require("./src/routes/PersonRoutes.js");
const menuRoutes = require("./src/routes/MenuRoutes.js");
app.use(bodyParse.json());
app.get("/", function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});

app.post("/person", async (req, res) => {
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

app.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    // console.log(data);
    console.log("data find successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

app.get("/person/:worktype", async (req, res) => {
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

//update person

app.put('/person/:id', async (req, res) => {
  try {
    const person_id = req.params.id;
    // console.log(person_id);
    const updatePersonData = req.body;
    const response = await person.findByIdAndUpdate(person_id, updatePersonData, {
      new: true, // return the update data
      runValidators: true, //   Run Moongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
})

// delete person

app.delete('/person/:id', async (req, res) => {
  try {
    const person_id = req.params.id;
    // console.log(person_id);
    const response = await person.findByIdAndDelete(person_id);
    if (!response) {
      res.status(404).json({ error: 'Invalid Person' })
    }
    console.log('Data Deleted');
    res.status(200).json({ message: 'Person Deleted Successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
})

// menu add

app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log("Menu Item add Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//menu view

app.get("/menu", async (req, res) => {
  try {
    const menu_item = await menuItem.find();
    console.log("Menu has been shown.");
    res.status(200).json(menu_item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.get("/menu/:taste", async (req, res) => {
  try {
    const tasteItem = req.params.taste;
    // console.log(tasteItem);
    if (tasteItem == 'sweet' || tasteItem == 'spicy' || tasteItem == 'sour') {
      const response = await menuItem.find({ taste: tasteItem });
      console.log('responce fetch successfully');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid Taste' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.listen(3000, () => {
  console.log("Server is running port 3000");
});

