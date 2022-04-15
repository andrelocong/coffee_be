import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { Validator } from "node-input-validator";
import jwt from "jsonwebtoken";
import { response } from "../util/response.util.js";

export const login = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			username: "required|string",
			password: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return response(res, 400, "Failed to login", {
				errors: validator.errors,
			});
		}

		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!user || typeof user === "string") {
			return response(res, 400, "Username not found!");
		} else {
			let submitPass = req.body.password;
			let storedPass = user.password;

			const passMatch = await bcrypt.compare(submitPass, storedPass);
			if (passMatch) {
				const userId = user.user_id;
				const username = user.username;
				const firstName = user.first_name;
				const accessToken = jwt.sign(
					{ username, firstName },
					process.env.JWT_PRIVATE_TOKEN,
					{
						expiresIn: "1h",
					}
				);
				return response(res, 200, "Successfully to login", {
					accessToken,
				});
			} else {
				return response(res, 400, "Invalid username or password");
			}
		}
	} catch (error) {
		console.log(error);
		return response(res, 500, "server error...");
	}
};

export const logout = async (req, res) => {
	try {
		const token = tokenGlobal;
		if (!token) {
			return res.status(204);
		} else {
			const user = await User.findOne({
				where: {
					refresh_token: token,
				},
			});

			if (!user) {
				return res.status(204);
			} else {
				return res.status(200).json({
					status: true,
					message: "Successfully to logout",
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const logouts = async (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.clearCookie("refreshToken");
	res.sendStatus(204);
};
