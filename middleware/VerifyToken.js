import { response } from "../util/response.util.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	console.log(req.headers);
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) {
		return response(res, 403, "Unauthenticated");
	} else {
		jwt.verify(token, process.env.JWT_PRIVATE_TOKEN, (err, decoded) => {
			if (err) {
				return response(res, 403, "Unauthenticated");
			} else {
				next();
			}
		});
	}
};
