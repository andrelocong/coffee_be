import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Gallery = db.define(
	"galleries",
	{
		gallery_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		category: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Gallery;
