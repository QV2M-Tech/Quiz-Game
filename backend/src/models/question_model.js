import mongoose from "mongoose";

const optionSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
});

const questionSchema = mongoose.Schema({
	subTopicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subtopic",
		required: true,
	},
	questionName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	option: {
		type: [optionSchema],
		required: true,
	},
	hint: {
		type: String,
	},
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
