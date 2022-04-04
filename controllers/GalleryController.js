import Gallery from "../models/Gallery.js";
import { Validator } from "node-input-validator";

export const uploadImage = async (req, res) => {
	try {
		const validator = new Validator(
			req.body,
			{
				category: "required|string",
			},
			req.file,
			{
				image: "required",
			}
		);
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to post image!",
				errors: validator.errors,
			});
		}

		let finalImageURL =
			req.protocol +
			"://" +
			req.get("host") +
			"/uploads/" +
			req.file.filename;

		const gallery = await Gallery.create({
			category: req.body.category,
			image: finalImageURL,
		});

		res.json({
			status: "true",
			message: "Successfully upload image!",
			image: finalImageURL,
			category: req.body.category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findAllGallery = async (req, res) => {
	try {
		const data = await Gallery.findAll();

		res.json({
			status: "true",
			message: "Successfully to find all data gallery!",
			gallery: data,
		});
	} catch (error) {
		console.log(error);
		req.status(500).json("server error");
	}
};

export const findGalleryByLimit = async (req, res) => {
	try {
		const gallery = await Gallery.findAll({
			limit: 6,
		});

		res.json({
			status: "true",
			message: "Successfully find all gallery by limit 6",
			data: gallery,
		});
	} catch (error) {
		console(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataGallery = async (req, res) => {
	try {
		await Gallery.destroy({
			where: {
				gallery_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Successfully deleted data gallery!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
