import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	profile: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	createOn: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
