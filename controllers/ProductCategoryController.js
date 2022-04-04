import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/Category.js";

export const createProductCategory = async (req, res) => {
	try {
		const data = await ProductCategory.create({
			product_id: req.body.productId,
			category_id: req.body.categoryId,
		});

		res.json({
			status: "true",
			message: "Product category was created!",
			data: data,
		});
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

		res.json({
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

		res.json({
			status: "true",
			message: "Detail product category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
