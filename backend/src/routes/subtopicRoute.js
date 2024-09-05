import express from "express";
import {
	getSubtopicById,
	getAllSubtopicsByTopicId,
	createSubtopic,
	updateSubtopicById,
	deleteSubtopicById,
} from "../controllers/subtopicController.js";
import authenticateUserMiddleware from "../middlewares/userAuthMiddleware.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.get("/:id", authenticateUserMiddleware, getSubtopicById);
router.get(
	"/topic/:topicId",
	authenticateUserMiddleware,
	getAllSubtopicsByTopicId
); // ดึงข้อมูล Subtopic โดยใช้ topicId
router.post("/create", authenticateAdminMiddleware, createSubtopic);
router.put("/:id", authenticateAdminMiddleware, updateSubtopicById);
router.delete("/:id", authenticateAdminMiddleware, deleteSubtopicById);

export default router;
