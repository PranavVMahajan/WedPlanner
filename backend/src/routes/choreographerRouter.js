const express = require("express");
const router = express.Router();
const {
  addChoreographer,
  getAllChoreographers,
  getChoreographerById,
  updateChoreographer,
  deleteChoreographer,
} = require("../controllers/choreographerController");

// POST - Add choreographer
router.post("/", addChoreographer);

// GET - All choreographers
router.get("/", getAllChoreographers);

// GET - By ID
router.get("/:id", getChoreographerById);

// PUT - Update by ID
router.put("/:id", updateChoreographer);

// DELETE - Remove by ID
router.delete("/:id", deleteChoreographer);

module.exports = router;
