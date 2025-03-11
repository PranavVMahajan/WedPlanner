const { JWTService } = require("../services")
const {default:StatusCode} = require("http-status") 
const ApiError = require("../utils/ApiError")

const HandlingLoggedUser=async(req,res,next)=>{
    //middleware to check user is logged in or not
    try {
        const authorization = req.headers['authorization']
        if(!authorization || !authorization.startsWith("Bearer ")){
            throw new ApiError(StatusCode.UNAUTHORIZED,"Missing or invalid token")
        }

        const token = authorization.split(" ")[1]

        if(!token){
            throw new ApiError(StatusCode.UNAUTHORIZED,"Invalid token")
        }

        const payload = await JWTService.validateToken(token)
        // change request user
        req.user = payload
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = HandlingLoggedUser;