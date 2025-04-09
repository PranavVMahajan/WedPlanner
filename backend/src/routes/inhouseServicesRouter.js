const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
} = require("../controllers/inhouseServicesController");

const router = express.Router();

// Base: /api/inhouseServices/service

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);

module.exports = router;
