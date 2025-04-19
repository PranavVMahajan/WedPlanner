const ShopItem = require("../models/Lehenga.model");

// Add a new shop item
const addShopItem = async (req, res) => {
  try {
    const item = new ShopItem(req.body);
    await item.save();
    res.status(201).json({ message: "Shop item added successfully", data: item });
  } catch (error) {
    console.error("Error adding shop item:", error);
    res.status(500).json({ message: "Failed to add shop item", error });
  }
};

// Get all shop items
const getAllShopItems = async (req, res) => {
  try {
    const items = await ShopItem.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching shop items:", error);
    res.status(500).json({ message: "Failed to fetch shop items", error });
  }
};

// Get a single shop item by MongoDB _id
const getShopItemById = async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching shop item by ID:", error);
    res.status(500).json({ message: "Failed to fetch shop item", error });
  }
};

// Update a shop item by ID
const updateShopItem = async (req, res) => {
  try {
    const updated = await ShopItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    res.status(200).json({ message: "Shop item updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating shop item:", error);
    res.status(500).json({ message: "Failed to update shop item", error });
  }
};

// Delete a shop item by ID
const deleteShopItem = async (req, res) => {
  try {
    const deleted = await ShopItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    res.status(200).json({ message: "Shop item deleted successfully", data: deleted });
  } catch (error) {
    console.error("Error deleting shop item:", error);
    res.status(500).json({ message: "Failed to delete shop item", error });
  }
};

module.exports = {
  addShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
};
