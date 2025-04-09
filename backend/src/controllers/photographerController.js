const Photographer = require('../models/Photography.model');

// Add a new photographer
const addPhotographer = async (req, res) => {
  try {
    const photographer = new Photographer(req.body);
    await photographer.save();
    res.status(201).json({ message: "Photographer added successfully", data: photographer });
  } catch (error) {
    console.error("Error adding photographer:", error);
    res.status(500).json({ message: "Failed to add photographer", error });
  }
};

// Get all photographers
const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.status(200).json(photographers);
  } catch (error) {
    console.error("Error fetching photographers:", error);
    res.status(500).json({ message: "Failed to fetch photographers", error });
  }
};

// Get photographer by MongoDB _id
const getPhotographerById = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.status(200).json(photographer);
  } catch (error) {
    console.error("Error fetching photographer:", error);
    res.status(500).json({ message: "Failed to fetch photographer", error });
  }
};

// Delete photographer by MongoDB _id
const deletePhotographer = async (req, res) => {
  try {
    const result = await Photographer.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.status(200).json({ message: "Photographer deleted successfully", deleted: result });
  } catch (error) {
    console.error("Error deleting photographer:", error);
    res.status(500).json({ message: "Failed to delete photographer", error });
  }
};

module.exports = {
  addPhotographer,
  getAllPhotographers,
  getPhotographerById,
  deletePhotographer,
};
