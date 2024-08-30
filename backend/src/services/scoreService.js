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
			$unwind: "$user",
		},
		{
			$unwind: "$subtopic",
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
			$unwind: "$topic",
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
