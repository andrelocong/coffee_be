import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Sosmed = db.define(
	"sosmeds",
	{
		sosmed_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		sosmed: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Sosmed;
