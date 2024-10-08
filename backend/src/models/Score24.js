import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	level: {
		type: String,
		required: true,
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
});

export default mongoose.model("Score24", scoreSchema);
