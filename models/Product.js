import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
	"products",
	{
		product_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
		paranoid: true,
	}
);

export default Product;
