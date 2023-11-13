import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const generalSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    minLength: [6, "Username must be at least 6 characters"],
    maxLength: [12, "Username must be at most 12 characters"],
  },
  Email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [isEmail, "enter a valid email"],
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
});

const AdminUser = mongoose.model("AdminUser", generalSchema);
export default AdminUser;
