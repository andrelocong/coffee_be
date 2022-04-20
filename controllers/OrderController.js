import Order from "../models/Order.js";
import Product from "../models/Product.js";
import MainCategory from "../models/MainCategory.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Quantity from "../models/Quantity.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			phone: "required|string",
			email: "required|email|string",
			productId: "required|string",
			mainCategoryId: "required|string",
			categoryId: "required|string",
			subCategoryId: "required|string",
			quantityId: "required|string",
			note: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to create order!",
				errors: validator.errors,
			});
		}

		if (req.body.mainCategoryId === "null") {
			const order = await Order.create({
				order_id: uuidv4(),
				name: req.body.name.toLowerCase(),
				phone: req.body.phone,
				email: req.body.email,
				product_id: req.body.productId,
				main_category_id: null,
				category_id: req.body.categoryId,
				sub_category_id: req.body.subCategoryId,
				quantity_id: req.body.quantityId,
				note: req.body.note.toLowerCase(),
				status: 0,
			});

			res.status(200).json({
				status: "true",
				message: "Order was created!",
				data: order,
			});
		} else if (req.body.categoryId === "null") {
			const order = await Order.create({
				order_id: uuidv4(),
				name: req.body.name.toLowerCase(),
				phone: req.body.phone,
				email: req.body.email,
				product_id: req.body.productId,
				main_category_id: req.body.mainCategoryId,
				category_id: null,
				sub_category_id: req.body.subCategoryId,
				quantity_id: req.body.quantityId,
				note: req.body.note.toLowerCase(),
				status: 0,
			});

			res.status(200).json({
				status: "true",
				message: "Order was created!",
				data: order,
			});
		} else if (req.body.subCategoryId === "null") {
			const order = await Order.create({
				order_id: uuidv4(),
				name: req.body.name.toLowerCase(),
				phone: req.body.phone,
				email: req.body.email,
				product_id: req.body.productId,
				main_category_id: req.body.mainCategoryId,
				category_id: req.body.categoryId,
				sub_category_id: null,
				quantity_id: req.body.quantityId,
				note: req.body.note.toLowerCase(),
				status: 0,
			});

			res.status(200).json({
				status: "true",
				message: "Order was created!",
				data: order,
			});
		} else {
			const order = await Order.create({
				order_id: uuidv4(),
				name: req.body.name.toLowerCase(),
				phone: req.body.phone,
				email: req.body.email,
				product_id: req.body.productId,
				main_category_id: req.body.mainCategoryId,
				category_id: req.body.categoryId,
				sub_category_id: req.body.subCategoryId,
				quantity_id: req.body.quantityId,
				note: req.body.note.toLowerCase(),
				status: 0,
			});

			res.status(200).json({
				status: "true",
				message: "Order was created!",
				data: order,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllOrder = async (req, res) => {
	try {
		const order = await Order.findAll({
			include: [{ model: Product, attributes: ["name"] }],
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find all order!",
			data: order,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findOrderById = async (req, res) => {
	try {
		const order = await Order.findOne({
			include: [
				{ model: Product, attributes: ["name"] },
				{ model: MainCategory, attributes: ["name"] },
				{ model: Category, attributes: ["name"] },
				{ model: SubCategory, attributes: ["name"] },
				{ model: Quantity, attributes: ["quantity"] },
			],
			where: {
				order_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find order data by id!",
			data: order,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.update(
			{
				status: 1,
			},
			{
				where: {
					order_id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: "true",
			message: "Order status was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataOrder = async (req, res) => {
	try {
		const order = await Order.destroy({
			where: {
				order_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Order was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
