import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const adminSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: [true, "username already exists"],
  },
  Email: {
    type: String,
    required: true,
    unique: [true, "email already exists"],
    validate: [isEmail, "enter a valid email"],
  },
  Password: {
    type: String,
    required: true,
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

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
