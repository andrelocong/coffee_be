import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Team = db.define(
	"teams",
	{
		team_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		position: {
			type: DataTypes.STRING,
		},
		desc: {
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

export default Team;
