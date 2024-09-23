const express = require("express");
const routes = express.Router();
const menuItem = require("../model/menuItem");

// add
routes.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log("Menu Item add Successfully");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// view
routes.get("/", async (req, res) => {
  try {
    const menu_item = await menuItem.find();
    console.log("Menu has been shown.");
    res.status(200).json(menu_item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

routes.get("/:taste", async (req, res) => {
  try {
    const tasteItem = req.params.taste;
    // console.log(tasteItem);
    if (tasteItem == "sweet" || tasteItem == "spicy" || tasteItem == "sour") {
      const response = await menuItem.find({ taste: tasteItem });
      console.log("responce fetch successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//update

routes.put("/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const updateMenuList = req.body;
    const response = await menuItem.findByIdAndUpdate(item_id, updateMenuList, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Item Not Found" });
    }
    console.log("Item is Updated");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//delete

routes.delete("/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const response = await menuItem.findByIdAndDelete(item_id);
    if (!response) {
      res.status(404).json({ error: "Item is Not found." });
    }
    console.log("Item Deleted");
    res.status(200).json({ message: "Item Deleted Successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = routes;
