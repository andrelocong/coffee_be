import Order from "../models/Order.js";
import Product from "../models/Product.js";
import MainCategory from "../models/MainCategory.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Quantity from "../models/Quantity.js";
import { Validator } from "node-input-validator";

export const createOrder = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			phone: "required|string",
			email: "required|email",
			productId: "required|integer",
			mainCategoryId: "required|integer",
			categoryId: "required|integer",
			subCategoryId: "required|integer",
			quantityId: "required|integer",
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

		const order = await Order.create({
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			product_id: req.body.productId,
			main_category_id: req.body.mainCategoryId,
			category_id: req.body.categoryId,
			sub_category_id: req.body.subCategoryId,
			quantity_id: req.body.quantityId,
			note: req.body.note,
			status: "pending",
		});

		res.json({
			status: "true",
			message: "Order was created!",
			data: order,
		});
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

		res.json({
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

		res.json({
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
				status: "approved",
			},
			{
				where: {
					order_id: req.params.id,
				},
			}
		);

		res.json({
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

		res.json({
			status: "true",
			message: "Order was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
