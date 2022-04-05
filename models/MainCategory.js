import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const MainCategory = db.define(
	"main_categories",
	{
		main_category_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default MainCategory;
