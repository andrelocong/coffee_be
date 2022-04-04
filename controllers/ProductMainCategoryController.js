import ProductMainCategory from "../models/ProductMainCategory.js";
import MainCategory from "../models/MainCategory.js";

export const createProductMainCategory = async (req, res) => {
	try {
		const data = await ProductMainCategory.create({
			product_id: req.body.productId,
			main_category_id: req.body.mainCategoryId,
		});

		res.json({
			status: "true",
			message: "Product main category was create!",
			data: data,
		});
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

		res.json({
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

		res.json({
			status: "true",
			message: "Detail product main category was deleted!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
