import Product from "../models/Product.js";
import { Op } from "sequelize";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const create = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			category: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make product!",
				errors: validator.errors,
			});
		}

		const product = await Product.create({
			product_id: uuidv4(),
			name: req.body.name.toLowerCase(),
			category: req.body.category,
		});

		res.status(200).json({
			status: "true",
			message: "Product created successfully!",
			product: product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAll = async (req, res) => {
	try {
		const data = await Product.findAll({
			order: [["name", "ASC"]],
		});

		res.status(200).json({
			status: "true",
			message: "Success to get all data product!",
			products: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const getDataById = async (req, res) => {
	try {
		const data = await Product.findOne({
			where: {
				product_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Success to get data product by id!",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const getDataByName = async (req, res) => {
	try {
		const item = req.query;

		const data = await Product.findAll({
			where: {
				name: {
					[Op.like]: "%" + item.search + "%",
				},
			},
			order: [["name", "ASC"]],
		});

		res.status(200).json({
			status: "true",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateData = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			category: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update product!",
				errors: validator.errors,
			});
		}

		const data = await Product.update(
			{
				name: req.body.name.toLowerCase(),
				category: req.body.category,
			},
			{
				where: {
					product_id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: "true",
			message: "Success to update data product!",
			data: req.body,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteData = async (req, res) => {
	try {
		await Product.destroy({
			where: {
				product_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "successfully deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
