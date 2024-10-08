import mongoose from "mongoose";
import Score from "../models/Score.js";

export async function getTopScoreService(subtopicId) {
	return Score.aggregate([
		{
			$match: {
				subtopicId: new mongoose.Types.ObjectId(`${subtopicId}`),
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$unwind: {
				path: "$user",
				preserveNullAndEmptyArrays: false, // ข้อมูล user ที่ไม่มีจะถูกกรองออก
			},
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

export async function getAllScoreService(sort) {
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
			$lookup: {
				from: "subtopics",
				localField: "subtopicId",
				foreignField: "_id",
				as: "subtopic",
			},
		},
		{
			$unwind: {
				path: "$user",
				preserveNullAndEmptyArrays: false, // ข้อมูล user ที่ไม่มีจะถูกกรองออก
			},
		},
		{
			$unwind: {
				path: "$subtopic",
				preserveNullAndEmptyArrays: false, // ข้อมูล user ที่ไม่มีจะถูกกรองออก
			},
		},
		{
			$lookup: {
				from: "topics",
				localField: "subtopic.topicId",
				foreignField: "_id",
				as: "topic",
			},
		},
		{
			$unwind: {
				path: "$topic",
				preserveNullAndEmptyArrays: false, // ข้อมูล user ที่ไม่มีจะถูกกรองออก
			},
		},
		{
			$project: {
				name: "$user.name",
				username: "$user.username",
				category: "$topic.category",
				topic: "$topic.topicName",
				subtopic: "$subtopic.subtopicName",
				score: 1,
				createOn: 1,
			},
		},
		{ $sort: { createOn: -1 } },
	]);
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
