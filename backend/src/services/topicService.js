import Topic from "../models/Topic.js";

export const createNewTopic = async ({ category, topicName }) => {
	const newTopic = new Topic({
		category,
		topicName,
	});

	await newTopic.save();

	return newTopic;
};
