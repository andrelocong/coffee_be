import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { Validator } from "node-input-validator";

export const logins = async (req, res) => {
	try {
		// console.log(req);
		const validator = new Validator(req.body, {
			username: "required|string",
			password: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to logins!",
				errors: validator.errors,
			});
		}

		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});
		if (!user || typeof user === "string") {
			return res.json({
				status: "false",
				message: "Username not found!",
			});
		} else {
			let submitPass = req.body.password;
			let storedPass = user.password;

			const passMatch = await bcrypt.compare(submitPass, storedPass);
			if (passMatch) {
				return res.json({
					status: "true",
					message: "Successfully to login.",
				});
			} else {
				return res.json({
					status: "false",
					message: "Invalid username or password.",
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};
