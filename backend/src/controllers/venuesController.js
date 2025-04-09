const Venue = require("../models/Venues.model");

// Add a new venue
const addVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json({ message: "Venue added successfully", data: venue });
  } catch (error) {
    console.error("Error adding venue:", error);
    res.status(500).json({ message: "Failed to add venue", error });
  }
};

// Get all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json({ success: true, data: venues });
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Failed to fetch venues", error });
  }
};

// Get venue by MongoDB _id
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: "Failed to fetch venue", error });
  }
};

// Delete venue by MongoDB _id
const deleteVenue = async (req, res) => {
  try {
    const result = await Venue.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ message: "Venue deleted successfully", deleted: result });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Failed to delete venue", error });
  }
};

module.exports = {
  addVenue,
  getAllVenues,
  getVenueById,
  deleteVenue,
};
