import Score from "../models/Score.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

export const getAllScore = async (req, res, next) => {
	try {
		const req = { user: { isAdmin: true } }; // mock
		const { isAdmin } = req.user;

		if (isAdmin) {
			const allScore = Score.find();
		} else {
			// top 10
			const allScore = Score.find();
		}

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
		next();
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
		});
	} catch (error) {
		next(error);
	}
};

export const deleteScore = async (req, res, next) => {
	try {
		const { scoreId } = req.params;
		const score = await getscoreByIdService(scoreId);
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
