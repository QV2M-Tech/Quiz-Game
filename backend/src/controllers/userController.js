import { registerUser, loginUser } from "../services/userService.js";

export const register = async (req, res, next) => {
	try {
		const { name, username, password } = req.body;
		const data = await registerUser({ name, username, password });
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
