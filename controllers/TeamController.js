import Team from "../models/Team.js";
import { Validator } from "node-input-validator";

export const createTeam = async (req, res) => {
	try {
		const validator = new Validator(
			req.body,
			{
				name: "required|string",
				position: "required|string",
				desc: "required|string",
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
				message: "Failed to make team descriptions!",
				errors: validator.errors,
			});
		}

		let finalImageURL =
			req.protocol +
			"://" +
			req.get("host") +
			"/uploads/" +
			req.file.filename;

		const team = await Team.create({
			name: req.body.name,
			position: req.body.position,
			desc: req.body.desc,
			image: finalImageURL,
		});

		res.json({
			status: "true",
			message: "Team was created!",
			data: team,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findALlTeam = async (req, res) => {
	try {
		const team = await Team.findAll();

		res.json({
			status: "true",
			message: "Successfully to find all data!",
			data: team,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const findDataByIdTeam = async (req, res) => {
	try {
		const team = await Team.findOne({
			where: {
				team_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Successfully find data by id!",
			data: team,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateDataTeam = async (req, res) => {
	try {
		const validator = new Validator(req.body, {
			name: "required|string",
			position: "required|string",
			desc: "required|string",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update team descriptions!",
				errors: validator.errors,
			});
		}

		const team = await Team.update(
			{
				name: req.body.name,
				position: req.body.position,
				desc: req.body.desc,
			},
			{
				where: {
					team_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Team was updated!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const updateImageTeam = async (req, res) => {
	try {
		const validator = new Validator(req.file, {
			image: "required",
		});
		const check = await validator.check();
		if (!check) {
			return res.status(400).json({
				status: "true",
				message: "Failed to update image!",
				errors: validator.errors,
			});
		}

		let finalImageURL =
			req.protocol +
			"://" +
			req.get("host") +
			"/uploads/" +
			req.file.filename;

		const team = await Team.update(
			{
				image: finalImageURL,
			},
			{
				where: {
					team_id: req.params.id,
				},
			}
		);

		res.json({
			status: "true",
			message: "Team image was update!",
			image: finalImageURL,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};

export const deleteDataTeam = async (req, res) => {
	try {
		await Team.destroy({
			where: {
				team_id: req.params.id,
			},
		});

		res.json({
			status: "true",
			message: "Team was deleted",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json("server error...");
	}
};
