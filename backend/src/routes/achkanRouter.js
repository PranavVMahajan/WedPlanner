const express = require('express');
const router = express.Router();
const {
  addShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
} = require('../controllers/achkanController');

// POST - Add a new shop item
router.post('/', addShopItem);

// GET - Get all shop items
router.get('/', getAllShopItems);

// GET - Get a shop item by MongoDB _id
router.get('/:id', getShopItemById);

// PUT - Update a shop item by _id
router.put('/:id', updateShopItem);

// DELETE - Delete a shop item by _id
router.delete('/:id', deleteShopItem);

module.exports = router;
