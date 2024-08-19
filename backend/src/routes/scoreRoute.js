import express from "express";
import {
	getAllScore,
	browseScore,
	createScore,
	deleteScore,
} from "../controllers/scoreController";

const router = express.Router();

// userAuthMiddleware
router.get("/", browseScore, getAllScore);

// userAuthMiddleware
router.post("/", createScore);

// adminAuthMiddleware
router.delete("/:scoreId", deleteScore);

export default router;
