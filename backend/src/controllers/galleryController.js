const GalleryImage = require("../models/Gallery.model");

// Add a new gallery image
const addGalleryImage = async (req, res) => {
  try {
    const image = new GalleryImage(req.body);
    await image.save();
    res.status(201).json({ message: "Image added successfully", data: image });
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({ message: "Failed to add image", error });
  }
};

// Get all gallery images
const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images", error });
  }
};

// Get single gallery image by MongoDB _id
const getGalleryImageById = async (req, res) => {
    try {
      const image = await GalleryImage.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(200).json({ success: true, data: image });
    } catch (error) {
      console.error("Error fetching image by ID:", error);
      res.status(500).json({ message: "Failed to fetch image", error });
    }
  };

// Delete gallery image by ID
const deleteGalleryImage = async (req, res) => {
  try {
    const deleted = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error });
  }
};

module.exports = {
  addGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  deleteGalleryImage,
};
