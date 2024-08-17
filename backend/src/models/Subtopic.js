import mongoose from "mongoose";

const subtopicSchema = mongoose.Schema({
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Topic",
		required: true,
	},
	subTopicName: {
		type: String,
		required: true,
	},
	time: {
		type: Number, // milliseconds
		required: true,
	},
});

const Subtopic = mongoose.model("Subtopic", subtopicSchema);

export default Subtopic;
