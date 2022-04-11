import ProductSubCategory from "../models/ProductSubCategory.js";
import SubCategory from "../models/SubCategory.js";
import { Validator } from "node-input-validator";
import { v4 as uuidv4 } from "uuid";

export const createProductSubCategory = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			productId: "required|string",
			subCategoryId: "required|string",
		});

		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to make product category",
				errors: validator.errors,
			});
		}

		const foundProductId = await ProductSubCategory.findAll({
			where: {
				product_id: req.body.productId,
			},
		});

		const foundSubCategoryId = foundProductId.find(
			(x) => x.sub_category_id === req.body.subCategoryId
		);

		if (!foundSubCategoryId) {
			const data = await ProductSubCategory.create({
				product_sub_category_id: uuidv4(),
				product_id: req.body.productId,
				sub_category_id: req.body.subCategoryId,
			});

			res.status(200).json({
				status: "true",
				message: "Product sub category was create!",
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

export const findAllProductSubCategory = async (req, res) => {
	try {
		const data = await ProductSubCategory.findAll({
			include: [SubCategory],
			where: {
				product_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Successfully find product sub category",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataProductSubCategory = async (req, res) => {
	try {
		await ProductSubCategory.destroy({
			where: {
				product_sub_category_id: req.params.id,
			},
		});

		res.status(200).json({
			status: "true",
			message: "Detail product sub category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
