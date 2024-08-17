import mongoose from "mongoose";

const topicSchema = mongoose.Schema({
	category: {
		type: String,
		required: true,
	},
	topicName: {
		type: String,
		required: true,
	},
});

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
