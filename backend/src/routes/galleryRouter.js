const express = require("express");
const router = express.Router();

const {
  addGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  deleteGalleryImage,
} = require("../controllers/galleryController");

// POST: Add a new image
router.post("/", addGalleryImage);

// GET: Get all gallery images
router.get("/", getAllGalleryImages);

// GET: Get single image by ID
router.get("/:id", getGalleryImageById);

// DELETE: Delete image by ID
router.delete("/:id", deleteGalleryImage);

module.exports = router;
