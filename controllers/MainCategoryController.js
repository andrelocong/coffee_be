import MainCategory from "../models/MainCategory.js";
import { Validator } from "node-input-validator";

export const createMainCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to create main category!",
				errors: validator.errors,
			});
		}

		const category = await MainCategory.create({
			name: req.body.name,
		});

		res.json({
			status: "true",
			message: "Main category was created!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllMainCategory = async (req, res) => {
	try {
		const category = await MainCategory.findAll();

		res.json({
			status: "true",
			message: "Successfully to find all data category!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findOneMainCategory = async (req, res) => {
	try {
		const category = await MainCategory.findOne({
			where: {
				main_category_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Successfully find category by id!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateMainCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update main category!",
				errors: validator.errors,
			});
		}

		const category = await MainCategory.update(
			{
				name: req.body.name,
			},
			{
				where: {
					main_category_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Main category was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteMainCategory = async (req, res) => {
	try {
		const category = await MainCategory.destroy({
			where: {
				main_category_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Main category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
