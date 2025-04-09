const express = require("express");
const router = express.Router();

const {
  addMehendiArtist,
  getAllMehendiArtists,
  getMehendiArtistById,
  deleteMehendiArtist,
} = require("../controllers/mehendiController");

// POST: Create a new mehendi artist
router.post("/", addMehendiArtist);

// GET: Fetch all mehendi artists
router.get("/", getAllMehendiArtists);

// GET: Fetch one mehendi artist by ID
router.get("/:id", getMehendiArtistById);

// DELETE: Delete mehendi artist by ID
router.delete("/:id", deleteMehendiArtist);

module.exports = router;
