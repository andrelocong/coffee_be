import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/Category.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createProductCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			productId: "required|string",
			categoryId: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make product category",
				errors: validator.errors,
			});
		}

		const foundProductId = await ProductCategory.findAll({
			where: {
				product_id: req.body.productId,
			},
		});

		const foundCategoryId = foundProductId.find(
			(x) => x.category_id === req.body.categoryId
		);

		if (!foundCategoryId) {
			const data = await ProductCategory.create({
				product_category_id: uuidv4(),
				product_id: req.body.productId,
				category_id: req.body.categoryId,
			});

			res.status(200).json({
				status: "true",
				message: "Product category was create!",
				data: data,
			});
		} else {
			return res.status(400).json({
				status: "false",
				message: "Menu has been used",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllProductCategory = async (req, res) => {
	try {
		const data = await ProductCategory.findAll({
			include: [Category],
			where: {
				product_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find product and category!",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataProductCategory = async (req, res) => {
	try {
		await ProductCategory.destroy({
			where: {
				product_category_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Detail product category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
