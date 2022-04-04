import SubCategory from "../models/SubCategory.js";
import { Validator } from "node-input-validator";

export const createSubCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make sub-category!",
				errors: validator.errors,
			});
		}

		const category = await SubCategory.create({
			name: req.body.name,
		});

		res.json({
			status: "true",
			message: "Sub category was created!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllSubCategory = async (req, res) => {
	try {
		const category = await SubCategory.findAll();

		res.json({
			status: "true",
			message: "Successfully find all data sub category!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataSubCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to updated sub-category!",
				errors: validator.errors,
			});
		}

		const category = await SubCategory.update(
			{
				name: req.body.name,
			},
			{
				where: {
					sub_category_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Sub category was updated!",
		});
	} catch (error) {
		console.log(errpr);
		res.status(500).json("server error...");
	}
};

export const deleteDataSubCategory = async (req, res) => {
	try {
		await SubCategory.destroy({
			where: {
				sub_category_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Sub category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
