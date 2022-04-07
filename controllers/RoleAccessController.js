import RoleAccess from "../models/RoleAccess.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createRoleAccess = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			menu: "required|string",
			roleId: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make role access!",
				errors: validator.errors,
			});
		}

		const foundMenu = await RoleAccess.findOne({
			where: {
				menu: req.body.menu,
			},
		});

		if (!foundMenu || typeof foundMenu === "string") {
			const role = await RoleAccess.create({
				role_access_id: uuidv4(),
				menu: req.body.menu,
				can_insert: 0,
				can_update: 0,
				can_delete: 0,
				role_id: req.body.roleId,
			});

			res.status(200).json({
				status: "true",
				message: "Role access was created!",
				data: role,
			});
		} else {
			return res.status(400).json({
				status: "false",
				message: "Menu has been used",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllRoleAccess = async (req, res) => {
	try {
		const role = await RoleAccess.findAll({
			where: {
				role_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find all role access data!",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataRoleAccess = async (req, res) => {
	try {
		const role = await RoleAccess.update(
			{
				can_insert: req.body.canInsert,
				can_update: req.body.canUpdate,
				can_delete: req.body.canDelete,
			},
			{
				where: {
					role_access_id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: "true",
			message: "Role access was updated!",
			data: role,
		});
	} catch (error) {}
};

export const deleteDataRoleAccess = async (req, res) => {
	try {
		await RoleAccess.destroy({
			where: {
				role_access_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Role access was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
