import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { sign } from "../utils/token.js";

export const registerUser = async ({ profile, name, username, password }) => {
	const existingUser = await User.findOne({ username });

	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await hashPassword(password);

	const newUser = new User({
		profile,
		name,
		username,
		password: hashedPassword,
	});

	await newUser.save();

	const token = sign({
		id: newUser._id,
		username: newUser.username,
		name: newUser.name,
		profile: newUser.profile,
		isAdmin: newUser.isAdmin,
	});

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

	const token = sign({
		id: user._id,
		username: user.username,
		name: user.name,
		profile: user.profile,
		isAdmin: user.isAdmin,
	});

	return { token, user };
};

export const modifyUser = async (id, name) => {
	const user = await User.findById(id);

	if (!user) {
		throw new Error("User not found");
	}

	user.name = name;
	await user.save();

	return user;
};

export const removeUser = async (id) => {
	const user = await User.findByIdAndDelete(id);

	if (!user) {
		throw new Error("User not found");
	}

	return;
};

export const fetchAllUsers = async () => {
	const users = await User.find({});
	return users;
};

export const fetchUserById = async (id) => {
	const user = await User.findById(id);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};
