import Sosmed from "../models/Sosmed.js";
import { Validator } from "node-input-validator";

export const createSosmed = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			address: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make sosial media address!",
				errors: validator.errors,
			});
		}

		const data = await Sosmed.create({
			name: req.body.name,
			address: req.body.address,
		});

		res.json({
			status: "true",
			message: "Sosmed was created!",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllSosmed = async (req, res) => {
	try {
		const data = await Sosmed.findAll();

		res.json({
			status: "true",
			message: "Successfully find all data sosmed!",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataSosmed = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			address: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update sosial media address!",
				errors: validator.errors,
			});
		}

		const data = await Sosmed.update(
			{
				name: req.body.name,
				address: req.body.address,
			},
			{
				where: {
					sosmed_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Successfully update data sosmed!",
			data: data,
		});
	} catch {
		console.log(error);
		res.status(500).json("server error..");
	}
};

export const deleteDataSosmed = async (req, res) => {
	try {
		await Sosmed.destroy({
			where: {
				sosmed_id: req.params.id,
			},
		});

		res.json({
			status: true,
			message: "Successfully deleted data sosmed!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
