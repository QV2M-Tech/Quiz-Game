import express from "express";
import {
	getAllScore,
	browseScore,
	createScore,
	deleteScore,
} from "../controllers/scoreController.js";

const router = express.Router();

// userAuthMiddleware
router.get("/", browseScore, getAllScore);

// userAuthMiddleware
router.post("/", createScore);

// adminAuthMiddleware
router.delete("/:scoreId", deleteScore);

export default router;
