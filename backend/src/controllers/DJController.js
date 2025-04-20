const DJ = require("../models/DJ.model");

const addDJ = async (req, res) => {
  try {
    const dj = new DJ(req.body);
    await dj.save();
    res.status(201).json({ message: "DJ added", data: dj });
  } catch (error) {
    res.status(500).json({ message: "Failed to add DJ", error });
  }
};

const getAllDJs = async (req, res) => {
  try {
    const djs = await DJ.find();
    res.status(200).json({ success: true, data: djs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DJs", error });
  }
};

const getDJById = async (req, res) => {
  try {
    const dj = await DJ.findById(req.params.id);
    if (!dj) return res.status(404).json({ message: "DJ not found" });
    res.status(200).json({ success: true, data: dj });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DJ", error });
  }
};

const updateDJ = async (req, res) => {
  try {
    const updated = await DJ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "DJ not found" });
    res.status(200).json({ message: "DJ updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update DJ", error });
  }
};

const deleteDJ = async (req, res) => {
  try {
    const deleted = await DJ.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "DJ not found" });
    res.status(200).json({ message: "DJ deleted", data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete DJ", error });
  }
};

module.exports = {
  addDJ,
  getAllDJs,
  getDJById,
  updateDJ,
  deleteDJ,
};
