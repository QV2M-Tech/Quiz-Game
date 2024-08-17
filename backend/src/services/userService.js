import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { sign } from "../utils/token.js";

export const registerUser = async ({ name, username, password }) => {
	const existingUser = await User.findOne({ username });

	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await hashPassword(password);

	const newUser = new User({
		name,
		username,
		password: hashedPassword,
	});

	await newUser.save();

	const token = sign({ id: newUser._id, username: newUser.username });

	return { token, user: newUser };
};

export const loginUser = async ({ username, password }) => {
	const user = await User.findOne({ username });

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isMatch = await comparePassword(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid credentials");
	}

	const token = sign({ id: user._id, username: user.username });

	return { token, user };
};
