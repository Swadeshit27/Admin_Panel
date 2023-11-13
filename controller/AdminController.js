import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CommonModel from "../model/AdminUserModel.js";

// admin registration
export const adminRegister = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    // check if admin is already exist or not
    const isAdminExist = await CommonModel.findOne({ Email });
    //  if the given email  is belongs to admin
    if (isAdminExist && isAdminExist.isAdmin) {
      return res
        .status(409)
        .json({ message: "Admin already exists", success: false });
    }
    // if the given email is belongs to user account
    if (isAdminExist && isAdminExist.isUser) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }
    // check if username is already exist or not
    const isUsernameExist = await CommonModel.findOne({ Username });
    if (isUsernameExist) {
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    }
    //   hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    // create admin object and save it in the database
    await CommonModel.create({
      Username,
      Email,
      Password: passwordHash,
    });
    res.status(200).json({
      message: "Admin registered successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error, success: false });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    // check if admin is already exist or not
    const admin = await CommonModel.findOne({ Username });
    // if admin is not exist, or email belongs to user
    if (!admin || admin.isUser) {
      return res
        .status(404)
        .json({ message: "Admin doesn't exists", success: false });
    }
    // check if password  matches or not
    const isPassMatch = await bcrypt.compare(Password, admin.Password);
    if (!isPassMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credential", success: false });
    }
    // generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRETKEY ,{expiresIn:"2h"});
    res
      .status(200)
      .json({ message: "admin login successful", token, success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error, success: false });
  }
};

// add users
export const addUsers = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    // check if the user is already exist or not
    const isUserExist = await CommonModel.findOne({ Email });
    // if the given email is belongs to the admin
    if (isUserExist && isUserExist.isAdmin) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }
    // if  the given email is belongs to the user
    if (isUserExist && isUserExist.isUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    // check if the username is already exist or not
    const isUsernameExist = await CommonModel.findOne({ Username });
    if (isUsernameExist) {
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    }
    //   hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    // create a new user object and save it in the database
    await CommonModel.create({
      Username,
      Email,
      Password: passwordHash,
      isUser: true,
      isAdmin: false,
    });

    res.status(200).json({
      message: "user added successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: error, success: false });
  }
};

// display users
export const displayAllUsers = async (req, res) => {
  try {
    // find all users presenting in the database
    const allUsers = await CommonModel.find({ isUser: true }).select("-isUser -isAdmin");
    if (!allUsers) {
      res.status(404).json({ message: "users not found", success: false });
    }
    res.status(200).json({ allUsers, success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error, success: false });
  }
};

