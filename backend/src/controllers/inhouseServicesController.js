const Service = require("../models/InhouseServices.model");
const ApiError = require("../utils/ApiError");

// Create new service
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

// Get all services
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(new ApiError(500, "Error fetching services"));
  }
};

// Get service by MongoDB _id
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new ApiError(404, "Service not found"));

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(new ApiError(500, "Error fetching service"));
  }
};

// Delete service by MongoDB _id
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return next(new ApiError(404, "Service not found"));

    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    next(new ApiError(500, "Error deleting service"));
  }
};
