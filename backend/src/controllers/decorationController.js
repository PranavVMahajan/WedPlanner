const Decoration = require("../models/Decoration.model");

// Add a new decoration
const addDecoration = async (req, res) => {
  try {
    const decoration = new Decoration(req.body);
    await decoration.save();
    res.status(201).json({ message: "Decoration added successfully", data: decoration });
  } catch (error) {
    console.error("Error adding decoration:", error);
    res.status(500).json({ message: "Failed to add decoration", error });
  }
};

// Get all decorations
const getAllDecorations = async (req, res) => {
  try {
    const decorations = await Decoration.find();
    res.status(200).json({ success: true, data: decorations });
  } catch (error) {
    console.error("Error fetching decorations:", error);
    res.status(500).json({ message: "Failed to fetch decorations", error });
  }
};

// Get decoration by ID
const getDecorationById = async (req, res) => {
  try {
    const decoration = await Decoration.findById(req.params.id);
    if (!decoration) {
      return res.status(404).json({ message: "Decoration not found" });
    }
    res.status(200).json({ success: true, data: decoration });
  } catch (error) {
    console.error("Error fetching decoration:", error);
    res.status(500).json({ message: "Failed to fetch decoration", error });
  }
};

// Delete decoration by ID
const deleteDecoration = async (req, res) => {
  try {
    const result = await Decoration.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Decoration not found" });
    }
    res.status(200).json({ message: "Decoration deleted successfully", deleted: result });
  } catch (error) {
    console.error("Error deleting decoration:", error);
    res.status(500).json({ message: "Failed to delete decoration", error });
  }
};

module.exports = {
  addDecoration,
  getAllDecorations,
  getDecorationById,
  deleteDecoration,
};
