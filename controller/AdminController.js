import Admin from "../model/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

// admin registration
export const adminRegister = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const isAdminExist = await Admin.findOne({ Email });
    const isUsernameExist = await Admin.findOne({ Username });
    if (isAdminExist) {
      return res
        .status(400)
        .json({ message: "Admin already exists", success: false });
    }
    if (isUsernameExist) {
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }
    // if (isAdminExist.isUser) return res.status(400).json({ message: ""});
    //   hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    const newAdmin = await Admin.create({
      Username,
      Email,
      Password: passwordHash,
    });
    res.status(200).json({
      message: "Admin created successfully",
      newAdmin,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const admin = await Admin.findOne({ Username });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Admin doesn't exists", success: false });
    }
    const isPassMatch = await bcrypt.compare(Password, admin.Password);
    if (!isPassMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credential", success: false });
    }
    console.log(isPassMatch);
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRETKEY);
    res
      .status(200)
      .json({ message: "admin login successful", token, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

// add users
export const addUsers = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const isUserExist = await User.findOne({ Email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    //   hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    const newUser = await User.create({
      Username,
      Email,
      Password: passwordHash,
    });
    res.status(200).json({
      message: "user added successfully",
      newUser,
      success: true,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// display users
export const displayAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      res.status(404).json({ message: "users not found", success: false });
    }
    res.status(200).json({ allUsers, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
