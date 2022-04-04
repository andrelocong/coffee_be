import ProductSubCategory from "../models/ProductSubCategory.js";
import SubCategory from "../models/SubCategory.js";

export const createProductSubCategory = async (req, res) => {
	try {
		const data = await ProductSubCategory.create({
			product_id: req.body.productId,
			sub_category_id: req.body.subCategoryId,
		});

		res.json({
			status: "true",
			message: "Detail product was created!",
			data: data,
		});
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

		res.json({
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

		res.json({
			status: "true",
			message: "Detail product sub category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
