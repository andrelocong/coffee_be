import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Quantity = db.define(
	"quantities",
	{
		quantity_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		quantity: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Quantity;
