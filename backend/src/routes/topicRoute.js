import express from "express";
import {
	getTopicById,
	getAllTopics,
	createTopic,
	updateTopicById,
	deleteTopicById,
} from "../controllers/topicController.js";
import authenticateUserMiddleware from "../middlewares/userAuthMiddleware.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.get("/:id", authenticateUserMiddleware, getTopicById);
router.get("/", authenticateUserMiddleware, getAllTopics);
router.post("/create", authenticateAdminMiddleware, createTopic);
router.put("/:id", authenticateAdminMiddleware, updateTopicById);
router.delete("/:id", authenticateAdminMiddleware, deleteTopicById);

export default router;
