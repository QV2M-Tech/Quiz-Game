import Subtopic from "../models/Subtopic.js";

export const findSubtopicById = async (id) => {
	return await Subtopic.findById(id).populate("topicId");
};

export const findAllSubtopicsByTopicId = async (topicId) => {
	return await Subtopic.find({ topicId }).populate("topicId");
};

export const createNewSubtopic = async ({ topicId, subtopicName, time }) => {
	console.log("Creating new subtopic:", { topicId, subtopicName, time });
	const newSubtopic = new Subtopic({
		topicId,
		subtopicName,
		time,
	});

	try {
		await newSubtopic.save();
		console.log("Subtopic saved successfully");
		return newSubtopic;
	} catch (error) {
		console.error("Error saving subtopic:", error);
		throw error;
	}
};

export const updateSubtopic = async (id, updateData) => {
	return await Subtopic.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteSubtopic = async (id) => {
	return await Subtopic.findByIdAndDelete(id);
};
