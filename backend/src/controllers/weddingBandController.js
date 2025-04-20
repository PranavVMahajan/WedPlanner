const WeddingBand = require("../models/WeddingBand.model");

const addWeddingBand = async (req, res) => {
  try {
    const band = new WeddingBand(req.body);
    await band.save();
    res.status(201).json({ message: "Wedding band added", data: band });
  } catch (error) {
    res.status(500).json({ message: "Failed to add wedding band", error });
  }
};

const getAllWeddingBands = async (req, res) => {
  try {
    const bands = await WeddingBand.find();
    res.status(200).json({ success: true, data: bands });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wedding bands", error });
  }
};

const getWeddingBandById = async (req, res) => {
  try {
    const band = await WeddingBand.findById(req.params.id);
    if (!band) return res.status(404).json({ message: "Wedding band not found" });
    res.status(200).json({ success: true, data: band });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wedding band", error });
  }
};

const updateWeddingBand = async (req, res) => {
  try {
    const updated = await WeddingBand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Wedding band not found" });
    res.status(200).json({ message: "Wedding band updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update wedding band", error });
  }
};

const deleteWeddingBand = async (req, res) => {
  try {
    const deleted = await WeddingBand.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Wedding band not found" });
    res.status(200).json({ message: "Wedding band deleted", data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete wedding band", error });
  }
};

module.exports = {
  addWeddingBand,
  getAllWeddingBands,
  getWeddingBandById,
  updateWeddingBand,
  deleteWeddingBand,
};
