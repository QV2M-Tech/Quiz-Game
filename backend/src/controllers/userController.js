import {
	registerUser,
	loginUser,
	modifyUser,
	removeUser,
	fetchAllUsers,
} from "../services/userService.js";

export const register = async (req, res, next) => {
	try {
		const { profile, name, username, password } = req.body;
		const data = await registerUser({ profile, name, username, password });
		res.status(201).json(data);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const data = await loginUser({ username, password });
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const data = await modifyUser(id, name);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		await removeUser(id);
		res.status(204).end();
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await fetchAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(400);
		next(error);
	}
};
