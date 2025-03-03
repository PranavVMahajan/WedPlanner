const { HandlingNotFound } = require("../middlewares/Handling404.middleware");

class ApiError extends Error{
    constructor(statusCode,message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ApiError