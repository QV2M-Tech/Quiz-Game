import express from "express";
import {
	getQuestionById,
	getAllQuestionsBySubtopicId,
	createQuestion,
	updateQuestionById,
	deleteQuestionById,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/:id", getQuestionById);
router.get("/subtopic/:subtopicId", getAllQuestionsBySubtopicId); // ดึงข้อมูล Question โดยใช้ subtopicId
router.post("/create", createQuestion);
router.put("/:id", updateQuestionById);
router.delete("/:id", deleteQuestionById);

export default router;
