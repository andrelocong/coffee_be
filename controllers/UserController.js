import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			firstName: "required|string",
			lastName: "required|string",
			username: "required|string",
			password: "required|string",
			role: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make user!",
				errors: validator.errors,
			});
		}

		const foundUser = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!foundUser || typeof foundUser === "string") {
			const password = req.body.password;
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(password, salt);

			const user = await User.create({
				user_id: uuidv4(),
				first_name: req.body.firstName.toLowerCase(),
				last_name: req.body.lastName.toLowerCase(),
				username: req.body.username,
				password: hashPassword,
				role_id: req.body.role,
			});

			res.status(200).json({
				status: "true",
				message: "User was created!",
				data: user,
			});
		} else {
			return res.status(400).json({
				status: "false",
				message: "Username already used",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllUser = async (req, res) => {
	try {
		const user = await User.findAll({
			attributes: [
				"user_id",
				"first_name",
				"last_name",
				"username",
				"email",
				"image",
				"phone",
			],
			include: [Role],
		});

		if (!user) {
			res.status(500).json({
				status: "false",
				message: "Data user empty!",
			});
		} else {
			res.status(200).json({
				status: "true",
				message: "Successfully find all data user!",
				data: user,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findOneByIdUser = async (req, res) => {
	try {
		const user = await User.findOne({
			attributes: [
				"user_id",
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
			message: "Success find data by id!",
			data: user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataUser = async (req, res) => {
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
		const user = await User.update(
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
			message: "User data was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateImageUser = async (req, res) => {
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

		const user = await User.update(
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
			message: "Image user was updated!",
			image: finalImageURL,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataUser = async (req, res) => {
	try {
		await User.destroy({
			where: {
				user_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "User data was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
