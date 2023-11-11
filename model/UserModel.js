import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: [true, "username already exists"],
  },
  Email: {
    type: String,
    required: true,
    unique: [true, "email already exists"],
  },
  Password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
