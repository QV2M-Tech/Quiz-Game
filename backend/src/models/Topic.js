import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
	category: {
		type: String,
		enum: ["วิชาการ", "บันเทิง"],
		required: true,
	},
	topicName: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Topic", topicSchema);
