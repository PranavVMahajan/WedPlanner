const express = require("express");
const router = express.Router();
const {
  addWeddingBand,
  getAllWeddingBands,
  getWeddingBandById,
  updateWeddingBand,
  deleteWeddingBand,
} = require("../controllers/weddingBandController");

router.post("/", addWeddingBand);
router.get("/", getAllWeddingBands);
router.get("/:id", getWeddingBandById);
router.put("/:id", updateWeddingBand);
router.delete("/:id", deleteWeddingBand);

module.exports = router;
