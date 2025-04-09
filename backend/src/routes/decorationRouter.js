const express = require("express");
const router = express.Router();

const {
  addDecoration,
  getAllDecorations,
  getDecorationById,
  deleteDecoration,
} = require("../controllers/decorationController");

// POST: Add new
router.post("/", addDecoration);

// GET: All
router.get("/", getAllDecorations);

// GET: By ID
router.get("/:id", getDecorationById);

// DELETE: By ID
router.delete("/:id", deleteDecoration);

module.exports = router;
