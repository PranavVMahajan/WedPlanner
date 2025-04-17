const { UserModel, ProfileModel } = require("../models");
const ApiError = require("../utils/ApiError");
const {default:httpStatus} = require("http-status");
const bcrypt = require("bcrypt");
const JWTService = require("./JWTService");

class AuthService {
  static async registerUser(body) {
    const { name, email, password } = body;
    // check if the user already exists or not
    const checkExist = await UserModel.findOne({ email: email.toLowerCase() });
    if (checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exists with this Email Account");
    }
    // create a new user
    const user = await UserModel.create({
      name,
      email,
      password
    });

    // create a Profile model
    await ProfileModel.create({
      user: user._id
    });

    // generate a JWT token for login
    const token = await JWTService.generateToken(user._id);

    return {
      msg: "User Registered Successfully",
      token
    };
  }

  static async loginUser(body) {
    const { email, password } = body;

    // Check for fixed admin credentials
    if (email === "admin@gmail.com" && password === "adminpassword") {
      const admin = { _id: "admin_id" };  // You can use any admin identifier
      const token = await JWTService.generateToken(admin._id);
      return {
        msg: "Admin Login Success",
        token
      };
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Does Not Exist with this Email Account");
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credentials");
    }

    // Generate a JWT token for the user
    const token = await JWTService.generateToken(user._id);
    
    return {
      msg: "Login Success",
      token
    };
  }

  static async userProfile(userId) {
    const user = await UserModel.findById(userId).select("-_id -password");

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const profile = await ProfileModel.findOne({ user: user._id });

    return {
      name: user.name,
      email: user.email
    };
  }
}

module.exports = AuthService;
