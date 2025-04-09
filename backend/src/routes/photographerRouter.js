const express = require('express');
const router = express.Router();
const {
  addPhotographer,
  getAllPhotographers,
  getPhotographerById,
  deletePhotographer
} = require('../controllers/photographerController');

// POST - Add new photographer
router.post('/', addPhotographer);

// GET - Fetch all photographers
router.get('/', getAllPhotographers);

// GET - Fetch photographer by ID
router.get('/:id', getPhotographerById);

// DELETE - Delete photographer by ID
router.delete('/:id', deletePhotographer);

module.exports = router;
