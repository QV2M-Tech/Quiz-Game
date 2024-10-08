import {
	getTopScoreService,
	getAllScoreService,
	getScoreByIdService,
	createScoreService,
	deleteScoreService,
} from "../services/scoreService.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

export const getTopScore = async (req, res, next) => {
	try {
		const { subtopicId } = req.params;
		const TopScore = await getTopScoreService(subtopicId);

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
		const allScore = await getAllScoreService();

		res.status(200).json({
			message: "get all score success",
			data: allScore,
		});
	} catch (error) {
		next(error);
	}
};

export const createScore = async (req, res, next) => {
	try {
		const { userId, subtopicId, score, timeSpent } = req.body;
		if (!userId || !subtopicId || !score || !timeSpent) {
			throw new BadRequestError("All field is require");
		}

		// find score if eq userId, subtopicId && score > old score >> save newscore

		const data = { userId, subtopicId, score, timeSpent };

		const newScore = await createScoreService(data);

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

		const score = await getScoreByIdService(scoreId);
		if (!score) {
			throw new NotFoundError(`score with id ${scoreId} is not found`);
		}

		await deleteScoreService(scoreId);

		res.status(200).json({
			message: `delete score id ${scoreId} success`,
		});
	} catch (error) {
		next(error);
	}
};
