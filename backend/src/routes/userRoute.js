import express from "express";
import {
	register,
	login,
	updateUser,
	deleteUser,
	getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

export default router;
