import Sosmed from "../models/Sosmed.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createSosmed = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			sosmed: "required|string",
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
			sosmed_id: uuidv4(),
			sosmed: req.body.sosmed.toLowerCase(),
			address: req.body.address,
		});

		res.status(200).json({
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

		res.status(200).json({
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
			sosmed: "required|string",
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
				sosmed: req.body.sosmed.toLowerCase(),
				address: req.body.address,
			},
			{
				where: {
					sosmed_id: req.params.id,
				},
			}
		);

		res.status(200).json({
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

		res.status(200).json({
			status: true,
			message: "Successfully deleted data sosmed!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
