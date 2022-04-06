import Category from "../models/Category.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

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
			category_id: uuidv4(),
			name: req.body.name.toLowerCase(),
		});

		res.status(200).json({
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

		res.status(200).json({
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
				name: req.body.name.toLowerCase(),
			},
			{
				where: {
					category_id: req.params.id,
				},
			}
		);

		res.status(200).json({
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

		res.status(200).json({
			status: "true",
			message: "Category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
