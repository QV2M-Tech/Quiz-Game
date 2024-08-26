import express from "express";
import {
	getTopScore,
	browseScore,
	getAllScore,
	createScore,
	deleteScore,
} from "../controllers/scoreController.js";

const router = express.Router();

// userAuthMiddleware
router.get("/top", getTopScore);

// adminAuthMiddleware
router.get("/", getAllScore);

// adminAuthMiddleware
router.get("/browse", browseScore);

// userAuthMiddleware
router.post("/", createScore);

// adminAuthMiddleware
router.delete("/:scoreId", deleteScore);

export default router;
