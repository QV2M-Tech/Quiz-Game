import {
	findTopicById,
	findAllTopics,
	createNewTopic,
	updateTopic,
	deleteTopic,
} from "../services/topicService.js";

export const getTopicById = async (req, res) => {
	try {
		const topic = await findTopicById(req.params.id);
		res.status(200).json({
			message: "Topic retrieved successfully",
			data: topic,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve topic",
			error: error.message,
		});
	}
};

export const getAllTopics = async (req, res) => {
	try {
		const topics = await findAllTopics();
		res.status(200).json({
			message: "Topics retrieved successfully",
			data: topics,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve topics",
			error: error.message,
		});
	}
};

export const createTopic = async (req, res) => {
	try {
		const { category, topicName } = req.body;
		const topic = await createNewTopic({ category, topicName });
		res.status(200).json({
			message: "Topic created successfully",
			data: topic,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to create topic",
			error: error.message,
		});
	}
};

export const updateTopicById = async (req, res) => {
	try {
		const topic = await updateTopic(req.params.id, req.body);
		res.status(200).json({
			message: "Topic updated successfully",
			data: topic,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to update topic",
			error: error.message,
		});
	}
};

export const deleteTopicById = async (req, res) => {
	try {
		await deleteTopic(req.params.id);
		res.status(200).json({
			message: "Topic deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete topic",
			error: error.message,
		});
	}
};
