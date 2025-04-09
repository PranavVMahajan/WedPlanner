const Caterer = require("../models/Catering.model");

// Add a new caterer
const addCaterer = async (req, res) => {
  try {
    const caterer = new Caterer(req.body);
    await caterer.save();
    res.status(201).json({ message: "Caterer added successfully", data: caterer });
  } catch (error) {
    console.error("Error adding caterer:", error);
    res.status(500).json({ message: "Failed to add caterer", error });
  }
};

// Get all caterers
const getAllCaterers = async (req, res) => {
  try {
    const caterers = await Caterer.find();
    res.status(200).json({ success: true, data: caterers });
  } catch (error) {
    console.error("Error fetching caterers:", error);
    res.status(500).json({ message: "Failed to fetch caterers", error });
  }
};

// Get caterer by MongoDB _id
const getCatererById = async (req, res) => {
  try {
    const caterer = await Caterer.findById(req.params.id);
    if (!caterer) {
      return res.status(404).json({ message: "Caterer not found" });
    }
    res.status(200).json({ success: true, data: caterer });
  } catch (error) {
    console.error("Error fetching caterer:", error);
    res.status(500).json({ message: "Failed to fetch caterer", error });
  }
};

// Delete caterer by MongoDB _id
const deleteCaterer = async (req, res) => {
  try {
    const result = await Caterer.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Caterer not found" });
    }
    res.status(200).json({ message: "Caterer deleted successfully", deleted: result });
  } catch (error) {
    console.error("Error deleting caterer:", error);
    res.status(500).json({ message: "Failed to delete caterer", error });
  }
};

// Export all controller functions
module.exports = {
  addCaterer,
  getAllCaterers,
  getCatererById,
  deleteCaterer,
};
