const express = require("express");
const router = express.Router();

const {
  addCaterer,
  getAllCaterers,
  getCatererById,
  deleteCaterer
} = require("../controllers/cateringController");

// Create new caterer
router.post("/", addCaterer);

// Get all caterers
router.get("/", getAllCaterers);

// Get caterer by MongoDB _id
router.get("/:id", getCatererById);

// Delete caterer by MongoDB _id
router.delete("/:id", deleteCaterer);

module.exports = router;
