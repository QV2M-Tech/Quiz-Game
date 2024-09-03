import express from "express";
import Score24 from "../models/Score24.js";
import { fetchUserById } from "../services/userService.js";

const router = express.Router();

// ฟังก์ชันในการสร้างคะแนนใหม่
const createAndUpdate = async (req, res) => {
	try {
		const { userId, score, level } = req.body;

		// ตรวจสอบข้อมูลที่รับมา
		if (!userId || !score || !level) {
			return res.status(401).json({ message: "All fields are required" });
		}

		// ค้นหาคะแนนเดิมที่มีอยู่สำหรับ userId และ level ที่กำหนด
		const existingScore = await Score24.findOne({ userId, level });

		if (existingScore) {
			// ถ้าคะแนนใหม่สูงกว่าคะแนนเดิม อัพเดทคะแนน
			if (parseInt(score) > parseInt(existingScore.score)) {
				existingScore.score = score;
				await existingScore.save();
				return res
					.status(200)
					.json({ message: "Score updated successfully", data: existingScore });
			} else {
				return res
					.status(402)
					.json({ message: "New score is not higher than the existing score" });
			}
		} else {
			// ถ้าไม่มีคะแนนเดิม สร้างคะแนนใหม่
			const newScore = new Score24({
				userId,
				score,
				level,
			});
			await newScore.save();
			return res
				.status(201)
				.json({ message: "Score created successfully", data: newScore });
		}
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// ฟังก์ชันในการดึงคะแนนสูงสุด 10 อันดับสำหรับระดับ `easy`
const top10easy = async (req, res) => {
	try {
		const scores = await Score24.find({ level: "easy" })
			.sort({ score: -1 })
			.limit(10);

		// เพิ่มการแมป userId เป็น name
		const scoresWithNames = await Promise.all(
			scores.map(async (score) => {
				const user = await fetchUserById(score.userId);
				return {
					...score._doc,
					name: user.name, // แทนที่ userId ด้วย name
				};
			})
		);

		return res.status(200).json(scoresWithNames);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// ฟังก์ชันในการดึงคะแนนสูงสุด 10 อันดับสำหรับระดับ `medium`
const top10medium = async (req, res) => {
	try {
		const scores = await Score24.find({ level: "medium" })
			.sort({ score: -1 })
			.limit(10);

		// เพิ่มการแมป userId เป็น name
		const scoresWithNames = await Promise.all(
			scores.map(async (score) => {
				const user = await fetchUserById(score.userId);
				return {
					...score._doc,
					name: user.name, // แทนที่ userId ด้วย name
				};
			})
		);

		return res.status(200).json(scoresWithNames);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// ฟังก์ชันในการดึงคะแนนสูงสุด 10 อันดับสำหรับระดับ `hard`
const top10hard = async (req, res) => {
	try {
		const scores = await Score24.find({ level: "hard" })
			.sort({ score: -1 })
			.limit(10);

		// เพิ่มการแมป userId เป็น name
		const scoresWithNames = await Promise.all(
			scores.map(async (score) => {
				const user = await fetchUserById(score.userId);
				return {
					...score._doc,
					name: user.name, // แทนที่ userId ด้วย name
				};
			})
		);

		return res.status(200).json(scoresWithNames);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// ตั้งค่าเส้นทางสำหรับ API
router.post("/createAndUpdate", createAndUpdate);
router.get("/top10/easy", top10easy);
router.get("/top10/medium", top10medium);
router.get("/top10/hard", top10hard);

export default router;
