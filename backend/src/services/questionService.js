import Question from "../models/Question.js";

export const findQuestionById = async (id) => {
	return await Question.findById(id).populate("subtopicId");
};

export const findAllQuestionsBySubtopicId = async (subtopicId) => {
	return await Question.find({ subtopicId })
		.populate("subtopicId", "name") // เพิ่ม populate เพื่อดึงชื่อ subtopic
		.lean(); // ใช้ lean() เพื่อเพิ่มประสิทธิภาพ
};

export const createNewQuestion = async ({
	subtopicId,
	questionName,
	image,
	option,
	hint,
}) => {
	const newQuestion = new Question({
		subtopicId,
		questionName,
		image,
		option,
		hint,
	});

	await newQuestion.save();

	return newQuestion;
};

export const updateQuestion = async (id, updateData) => {
	return await Question.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteQuestion = async (id) => {
	return await Question.findByIdAndDelete(id);
};
