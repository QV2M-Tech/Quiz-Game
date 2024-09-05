import express from "express";
import {
	register,
	login,
	updateUser,
	deleteUser,
	getAllUsers,
} from "../controllers/userController.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/:id", authenticateAdminMiddleware, updateUser);
router.delete("/:id", authenticateAdminMiddleware, deleteUser);
router.get("/", authenticateAdminMiddleware, getAllUsers);

export default router;
