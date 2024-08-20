import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	subtopicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "subtopics",
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
		text: {
			type: String,
			required: true,
		},
		isCorrect: {
			type: Boolean,
			required: true,
		},
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
