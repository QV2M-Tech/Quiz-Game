import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "topics",
		required: true,
	},
	subtopicName: {
		type: String,
		required: true,
	},
	time: {
		type: Number, // milliseconds
		required: true,
	},
});

export default mongoose.model("Subtopic", subtopicSchema);
