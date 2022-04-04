import Quantity from "../models/Quantity.js";
import { Validator } from "node-input-validator";

export const createQuantity = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			quantity: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make quantity!",
				errors: validator.errors,
			});
		}

		const quantity = await Quantity.create({
			quantity: req.body.quantity,
		});

		res.json({
			status: "true",
			message: "Quantity was created!",
			data: quantity,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllQuantity = async (req, res) => {
	try {
		const quantity = await Quantity.findAll();

		res.json({
			status: "true",
			message: "Successfully find all data quantity!",
			data: quantity,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataQuantity = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			quantity: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update quantity!",
				errors: validator.errors,
			});
		}

		const quantity = await Quantity.update(
			{
				quantity: req.body.quantity,
			},
			{
				where: {
					quantity_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Quantity was updated!",
		});
	} catch (error) {
		console.log(error);
		res.stauts(500).json("server error...");
	}
};

export const deleteDataQuantity = async (req, res) => {
	try {
		await Quantity.destroy({
			where: {
				quantity_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Quantity was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
