import express from "express";
import {
	getSubtopicById,
	getAllSubtopicsByTopicId,
	createSubtopic,
	updateSubtopicById,
	deleteSubtopicById,
} from "../controllers/subtopicController.js";

const router = express.Router();

router.get("/:id", getSubtopicById);
router.get("/topic/:topicId", getAllSubtopicsByTopicId); // ดึงข้อมูล Subtopic โดยใช้ topicId
router.post("/create", createSubtopic);
router.put("/:id", updateSubtopicById);
router.delete("/:id", deleteSubtopicById);

export default router;
