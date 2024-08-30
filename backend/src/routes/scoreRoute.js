import express from "express";
import {
	getTopScore,
	getAllScore,
	createScore,
	deleteScore,
} from "../controllers/scoreController.js";

const router = express.Router();

// userAuthMiddleware
router.get("/top", getTopScore);

// adminAuthMiddleware
router.get("/", getAllScore);

// userAuthMiddleware
router.post("/", createScore);

// adminAuthMiddleware
router.delete("/:scoreId", deleteScore);

export default router;
