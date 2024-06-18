import cakeModel from "../models/cakeModel.js";
import fs from "fs";

// Add cake item
const addCake = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const cake = new cakeModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    const existingCake = await cakeModel.findOne({ name: req.body.name });
    if (existingCake) {
      fs.unlink(`uploads/${image_filename}`, () => {});
      return res.status(400).json({
        success: false,
        message: "Cake with this name already exists.",
      });
    }
  } catch (error) {
    console.error("Error checking existing cake:", error);
    fs.unlink(`uploads/${image_filename}`, () => {});
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }

  try {
    await cake.save();
    res.json({ success: true, message: "Cake Added" });
  } catch (error) {
    console.error("Error adding cake:", error);
    fs.unlink(`uploads/${image_filename}`, () => {});
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get all cakes
const listCake = async (req, res) => {
  try {
    const cakes = await cakeModel.find({});
    res.json({ success: true, data: cakes });
  } catch (error) {
    console.error("Error list cake:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getCake = async (req, res) => {
  try {
    const cakeId = req.params.id;
    const cake = await cakeModel.findById(cakeId);
    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "Cake not found." });
    }
    res.json({ success: true, data: cake });
  } catch (error) {
    console.error("Error getting cake:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Remove cake
const removeCake = async (req, res) => {
  try {
    const cakeId = req.params.id;
    const cake = await cakeModel.findById(cakeId);
    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "Cake not found." });
    }
    fs.unlink(`uploads/${cake.image}`, () => {});
    await cakeModel.findByIdAndDelete(cakeId);
    res.json({ success: true, message: "Cake removed." });
  } catch (error) {
    console.error("Error removing cake:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update cake
const updateCake = async (req, res) => {
  try {
    const cakeId = req.params.id;
    let cake = await cakeModel.findById(cakeId);
    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "Cake not found." });
    }
    let updateData = {};
    if (req.body.name) {
      updateData.name = req.body.name;
    }
    if (req.body.description) {
      updateData.description = req.body.description;
    }
    if (req.body.price) {
      updateData.price = req.body.price;
    }
    if (req.body.category) {
      updateData.category = req.body.category;
    }
    if (req.file) {
      if (cake.image) {
        fs.unlink(`uploads/${cake.image}`, () => {});
      }
      updateData.image = req.file.filename;
    }
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update." });
    }
    cake = await cakeModel.findByIdAndUpdate(cakeId, updateData, { new: true });

    res.json({ success: true, message: "Cake updated.", data: cake });
  } catch (error) {
    console.error("Error updating cake:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { addCake, listCake, removeCake, updateCake, getCake };
