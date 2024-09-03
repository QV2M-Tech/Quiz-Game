import { verify } from "../utils/token.js";
import { UnAuthorizeError } from "../utils/error.js";
import User from "../models/User.js";

const authenticateMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) throw new UnAuthorizeError("Unauthenticated");

		const decoded = verify(token);
		const user = await User.findById(decoded.id);
		if (!user) throw new UnAuthorizeError("Unauthenticated");
		if (!user.isAdmin) throw new UnAuthorizeError("Unauthenticated");

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

export default authenticateMiddleware;
