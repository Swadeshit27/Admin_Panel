import express from "express";
import {
  addUsers,
  adminLogin,
  adminRegister,
  displayAllUsers,
} from "../controller/AdminController.js";
import authentication from "../middleware/authentication.js";
const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post("/add-user", authentication, addUsers);
router.get("/all-users", authentication, displayAllUsers);

export default router;
