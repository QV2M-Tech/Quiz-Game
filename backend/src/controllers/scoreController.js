import Score from "../models/Score.js";
import { NotFoundError } from "../utils/error.js";

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
