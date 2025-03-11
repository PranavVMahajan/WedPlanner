const {body,validationResult} = require("express-validator")
const ApiError = require("../utils/ApiError")
const {default:StatusCode} = require("http-status")

class AuthValidation {

    static registerUser=[
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").isEmail().withMessage("Email must be proper email").notEmpty().withMessage("Email is Required"),
        body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password length should be greater than 8 characters")
    ]

    static loginUser=[
        body("email").isEmail().withMessage("Email must be proper email").notEmpty().withMessage("Email is Required"),
        body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password length should be greater than 8 characters")
    ]
    static Vaildator=async(req,res,next)=>{
        try {
            const errors = await validationResult(req)
            if(!errors.isEmpty()) {
                const msg = errors.array()[0].msg
                throw new ApiError(StatusCode.BAD_REQUEST,msg)
                return  
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthValidation