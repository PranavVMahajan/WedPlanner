const express = require("express")
const { AuthController } = require("../controllers")
const { AuthValidation } = require("../validations")
const HandlingLoggedUser = require("../middlewares/HandlingLoggedUser.middleware")
const router = express.Router()

// POST: /api/v1/auth/register --- register a user

router.post("/register",AuthValidation.registerUser,AuthValidation.Vaildator,AuthController.registerUser)



router.post("/login",AuthValidation.loginUser,AuthValidation.Vaildator,AuthController.loginUser)

//GET: /api/v1/auth/profile-- profile for logged a user :200
router.get("/profile",HandlingLoggedUser,AuthController.userProfile)

module.exports = router