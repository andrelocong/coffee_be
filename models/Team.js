import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Team = db.define(
	"teams",
	{
		team_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
		createdAt: {
			type: DataTypes.TIME,
		},
		updatedAt: {
			type: DataTypes.TIME,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Team;
