import Score from "../models/Score.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

export const getTopScore = async (req, res, next) => {
	try {
		const TopScore = await Score.find()
			.sort({ score: -1, timeSpent: 1 })
			.limit(10);

		// อยากได้ชื่อด้วย
		res.status(200).json({
			message: "get top 10 scores success",
			data: TopScore,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllScore = async (req, res, next) => {
	try {
		const allScore = await Score.find().sort({ createOn: -1 });

		// วันที่, ชื่อ, ชื่อผู้ใช้, หมวดหมู่, หัวข้อ, หัวข้อย่อย, คะแนน
		res.status(200).json({
			message: "get all score success",
			data: allScore,
		});
	} catch (error) {
		next(error);
	}
};

export const browseScore = async (req, res, next) => {
	try {
		const { query } = req;
		console.log(query);

		// เอาชื่อไปหา || ส่ง id มา

		res.status(200).json({
			message: "get score success",
			data: query,
		});
	} catch (error) {
		next(error);
	}
};

export const createScore = async (req, res, next) => {
	try {
		const { userId, subTopicId, score, timeSpent } = req.body;
		if (!userId || !subTopicId || !score || !timeSpent) {
			throw new BadRequestError("All field is require");
		}

		// find score if eq userId, subTopicId && score > old score >> save newscore

		const data = { userId, subTopicId, score, timeSpent };

		const newScore = new Score(data);
		await newScore.save();

		res.status(201).json({
			message: "Create score success",
			data: newScore,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteScore = async (req, res, next) => {
	try {
		const { scoreId } = req.params;
		const score = await Score.findById(scoreId);
		if (!score) {
			throw new NotFoundError(`score with id ${scoreId} is not found`);
		}

		await Score.findByIdAndDelete(scoreId);

		res.status(200).json({
			message: `delete score id ${scoreId} success`,
		});
	} catch (error) {
		next(error);
	}
};
