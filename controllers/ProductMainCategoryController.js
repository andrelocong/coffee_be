import ProductMainCategory from "../models/ProductMainCategory.js";
import MainCategory from "../models/MainCategory.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createProductMainCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			productId: "required|string",
			mainCategoryId: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make product category",
				errors: validator.errors,
			});
		}

		const foundProductId = await ProductMainCategory.findAll({
			where: {
				product_id: req.body.productId,
			},
		});

		const foundMainCategoryId = foundProductId.find(
			(x) => x.main_category_id === req.body.mainCategoryId
		);

		if (!foundMainCategoryId) {
			const data = await ProductMainCategory.create({
				product_main_category_id: uuidv4(),
				product_id: req.body.productId,
				main_category_id: req.body.mainCategoryId,
			});

			res.status(200).json({
				status: "true",
				message: "Product main category was create!",
				data: data,
			});
		} else {
			return res.status(400).json({
				status: "false",
				message: "category has been used",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllProductMainCategory = async (req, res) => {
	try {
		const data = await ProductMainCategory.findAll({
			include: [{ model: MainCategory }],
			where: {
				product_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find product and main category!",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataProductMainCategory = async (req, res) => {
	try {
		await ProductMainCategory.destroy({
			where: {
				product_main_category_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Detail product main category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
