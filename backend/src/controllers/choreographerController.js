const Choreographer = require("../models/Choreographer.model");

// Add a new choreographer
const addChoreographer = async (req, res) => {
  try {
    const choreographer = new Choreographer(req.body);
    await choreographer.save();
    res.status(201).json({ message: "Choreographer added successfully", data: choreographer });
  } catch (error) {
    console.error("Error adding choreographer:", error);
    res.status(500).json({ message: "Failed to add choreographer", error });
  }
};

// Get all choreographers
const getAllChoreographers = async (req, res) => {
  try {
    const choreographers = await Choreographer.find();
    res.status(200).json({ success: true, data: choreographers });
  } catch (error) {
    console.error("Error fetching choreographers:", error);
    res.status(500).json({ message: "Failed to fetch choreographers", error });
  }
};

// Get choreographer by ID
const getChoreographerById = async (req, res) => {
  try {
    const choreographer = await Choreographer.findById(req.params.id);
    if (!choreographer) {
      return res.status(404).json({ message: "Choreographer not found" });
    }
    res.status(200).json({ success: true, data: choreographer });
  } catch (error) {
    console.error("Error fetching choreographer by ID:", error);
    res.status(500).json({ message: "Failed to fetch choreographer", error });
  }
};

// Update choreographer by ID
const updateChoreographer = async (req, res) => {
  try {
    const updated = await Choreographer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Choreographer not found" });
    }
    res.status(200).json({ message: "Choreographer updated", data: updated });
  } catch (error) {
    console.error("Error updating choreographer:", error);
    res.status(500).json({ message: "Failed to update choreographer", error });
  }
};

// Delete choreographer by ID
const deleteChoreographer = async (req, res) => {
  try {
    const deleted = await Choreographer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Choreographer not found" });
    }
    res.status(200).json({ message: "Choreographer deleted", data: deleted });
  } catch (error) {
    console.error("Error deleting choreographer:", error);
    res.status(500).json({ message: "Failed to delete choreographer", error });
  }
};

module.exports = {
  addChoreographer,
  getAllChoreographers,
  getChoreographerById,
  updateChoreographer,
  deleteChoreographer,
};
