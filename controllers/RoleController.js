import Role from "../models/Role.js";
import RoleAccess from "../models/RoleAccess.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createRole = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make role!",
				errors: validator.errors,
			});
		}

		const role = await Role.create({
			role_id: uuidv4(),
			name: req.body.name.toLowerCase(),
		});

		res.json({
			status: "true",
			message: "Role was created!",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllRole = async (req, res) => {
	try {
		const role = await Role.findAll();

		res.json({
			status: "true",
			message: "Successfully find all role data!",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findOneRole = async (req, res) => {
	try {
		const role = await Role.findOne({
			where: {
				role_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Successfully find one data role!",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataRole = async (req, res) => {
	try {
		await Role.destroy({
			where: {
				role_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Role was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
