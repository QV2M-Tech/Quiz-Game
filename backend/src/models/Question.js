import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
});

const questionSchema = new mongoose.Schema({
	subtopicId: {
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
		type: [optionSchema], // เปลี่ยนเป็นอาร์เรย์ของ optionSchema
		required: true,
	},
	hint: {
		type: String,
		required: true,
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
});

export default mongoose.model("Question", questionSchema);
