const express = require("express");
const router = express.Router();

const {
  addVenue,
  getAllVenues,
  getVenueById,
  deleteVenue,
} = require("../controllers/venuesController");

// Create a new venue
router.post("/", addVenue);

// Get all venues
router.get("/", getAllVenues);

// Get venue by MongoDB _id
router.get("/:id", getVenueById);

// Delete venue by MongoDB _id
router.delete("/:id", deleteVenue);

module.exports = router;
