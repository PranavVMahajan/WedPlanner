const MehendiArtist = require("../models/Mehendi.model");

// Add a new mehendi artist
const addMehendiArtist = async (req, res) => {
  try {
    const artist = new MehendiArtist(req.body);
    await artist.save();
    res.status(201).json({ message: "Mehendi artist added successfully", data: artist });
  } catch (error) {
    console.error("Error adding artist:", error);
    res.status(500).json({ message: "Failed to add artist", error });
  }
};

// Get all mehendi artists
const getAllMehendiArtists = async (req, res) => {
  try {
    const artists = await MehendiArtist.find();
    res.status(200).json({ success: true, data: artists });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ message: "Failed to fetch artists", error });
  }
};

// Get mehendi artist by MongoDB _id
const getMehendiArtistById = async (req, res) => {
  try {
    const artist = await MehendiArtist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Mehendi artist not found" });
    }
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    console.error("Error fetching artist:", error);
    res.status(500).json({ message: "Failed to fetch artist", error });
  }
};

// Delete mehendi artist by MongoDB _id
const deleteMehendiArtist = async (req, res) => {
  try {
    const result = await MehendiArtist.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Mehendi artist not found" });
    }
    res.status(200).json({ message: "Mehendi artist deleted successfully", deleted: result });
  } catch (error) {
    console.error("Error deleting artist:", error);
    res.status(500).json({ message: "Failed to delete artist", error });
  }
};

module.exports = {
  addMehendiArtist,
  getAllMehendiArtists,
  getMehendiArtistById,
  deleteMehendiArtist,
};
