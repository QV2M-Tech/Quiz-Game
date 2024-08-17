import mongoose from "mongoose";

const userScoreSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	subTopicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subtopic",
		required: true,
	},
	score: {
		type: String,
		required: true,
	},
	timeSpent: {
		type: Number, // milliseconds
		required: true,
	},
	createOn: {
		type: Date,
		default: Date.now,
	},
});

const UserScore = mongoose.model("UserScore", userScoreSchema);

export default UserScore;
