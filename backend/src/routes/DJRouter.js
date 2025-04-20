const express = require("express");
const router = express.Router();
const {
  addDJ,
  getAllDJs,
  getDJById,
  updateDJ,
  deleteDJ,
} = require("../controllers/DJController");

router.post("/", addDJ);
router.get("/", getAllDJs);
router.get("/:id", getDJById);
router.put("/:id", updateDJ);
router.delete("/:id", deleteDJ);

module.exports = router;
