import express from "express";
import {
	getTopicById,
	getAllTopics,
	createTopic,
	updateTopicById,
	deleteTopicById,
} from "../controllers/topicController.js";

const router = express.Router();

router.get("/:id", getTopicById);
router.get("/", getAllTopics);
router.post("/create", createTopic);
router.put("/:id", updateTopicById);
router.delete("/:id", deleteTopicById);

export default router;
