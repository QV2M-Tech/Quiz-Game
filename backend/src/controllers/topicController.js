import { createNewTopic } from "../services/topicService.js";

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
