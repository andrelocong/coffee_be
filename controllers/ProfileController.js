import User from "../models/User.js";
import Role from "../models/Role.js";
import { Validator } from "node-input-validator";
import bcrypt from "bcryptjs";

export const findOneById = async (req, res) => {
	try {
		const user = await User.findOne({
			attributes: [
				"first_name",
				"last_name",
				"username",
				"email",
				"image",
				"phone",
			],
			include: [Role],
			where: {
				user_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "find data user by username",
			data: user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataProfile = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			firstName: "required|string",
			lastName: "required|string",
			username: "required|string",
			role: "required|string",
			email: "email",
			phone: "string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update user!",
				errors: validator.errors,
			});
		}

		const profile = await User.update(
			{
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				username: req.body.username,
				email: req.body.email,
				role_id: req.body.role,
				phone: req.body.phone,
			},
			{
				where: {
					user_id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: "true",
			message: "Profile data was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateImageProfile = async (req, res) => {
	try {
		const validator = new Validator((req.file.image = "required"));

		const check = await validator.check();

		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update image!",
				errors: validator.errors,
			});
		}

		let finalImageURL =
			req.protocol +
			"://" +
			req.get("host") +
			"/uploads/" +
			req.file.filename;

		const profile = await User.update(
			{
				image: finalImageURL,
			},
			{
				where: {
					user_id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: "true",
			message: "Image profile was updated!",
			image: finalImageURL,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updatePasswordProfile = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				user_id: req.params.id,
			},
		});

		let submitPass = req.body.oldPassword;
		let storedPass = user.password;

		const passMatch = await bcrypt.compare(submitPass, storedPass);

		if (passMatch) {
			const newPass = req.body.newPassword;
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(newPass, salt);

			const users = await User.update(
				{
					password: hashPassword,
				},
				{
					where: {
						user_id: req.params.id,
					},
				}
			);

			res.status(200).json({
				status: "true",
				message: "Password was updated",
			});
		} else {
			res.status(400).json({
				status: "false",
				message: "Old password not valid",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
