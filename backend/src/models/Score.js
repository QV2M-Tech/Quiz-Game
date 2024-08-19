import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	subTopicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "subtopics",
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	timeSpent: {
		type: Number, // milliseconds
		required: true,
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
});

export default mongoose.model("Score", scoreSchema);
