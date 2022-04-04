import Category from "../models/Category.js";
import { Validator } from "node-input-validator";

export const createCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make category!",
				errors: validator.errors,
			});
		}

		const category = await Category.create({
			name: req.body.name,
		});

		res.json({
			status: "true",
			message: "Category was created!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllCategory = async (req, res) => {
	try {
		const category = await Category.findAll();

		res.json({
			status: "true",
			message: "Successfully find all data category!",
			data: category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update category!",
				errors: validator.errors,
			});
		}

		const category = await Category.update(
			{
				name: req.body.name,
			},
			{
				where: {
					category_id: req.params.id,
				},
			}
		);

		res.json({
			statu: "true",
			message: "Category was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataCategory = async (req, res) => {
	try {
		await Category.destroy({
			where: {
				category_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
