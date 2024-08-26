import mongoose from "mongoose";
import Score from "../models/Score.js";

export async function getTopScoreService() {
	return Score.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$unwind: "$user",
		},
		{
			$project: {
				name: "$user.name",
				score: 1,
				timeSpent: 1,
			},
		},
		{ $sort: { score: -1, timeSpent: 1 } },
		{ $limit: 10 },
	]);
}

export async function getAllScoreService() {
	// วันที่, ชื่อ, ชื่อผู้ใช้, หมวดหมู่, หัวข้อ, หัวข้อย่อย, คะแนน
	return Score.find().sort({ createOn: -1 });
}

export async function browseScoreService() {
	// เอาชื่อไปหา || ส่ง id มา
	return Score.find().sort({ createOn: -1 });
	// return
}

export async function getScoreByIdService(scoreId) {
	return Score.findById(scoreId);
}

export async function createScoreService(data) {
	const newScore = new Score(data);
	await newScore.save();
	return newScore;
}

export async function deleteScoreService(scoreId) {
	return Score.findByIdAndDelete(scoreId);
}
