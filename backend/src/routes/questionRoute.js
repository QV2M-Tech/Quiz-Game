import express from "express";
import {
	getQuestionById,
	getAllQuestionsBySubtopicId,
	createQuestion,
	updateQuestionById,
	deleteQuestionById,
} from "../controllers/questionController.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";
import authenticateUserMiddleware from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.get("/:id", authenticateUserMiddleware, getQuestionById);
router.get(
	"/subtopic/:subtopicId",
	authenticateUserMiddleware,
	getAllQuestionsBySubtopicId
); // ดึงข้อมูล Question โดยใช้ subtopicId
router.post("/", authenticateAdminMiddleware, createQuestion);
router.put("/:id", authenticateAdminMiddleware, updateQuestionById);
router.delete("/:id", authenticateAdminMiddleware, deleteQuestionById);

export default router;
