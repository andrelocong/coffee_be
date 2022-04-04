import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Product from "./Product.js";
import SubCategory from "./SubCategory.js";

const { DataTypes } = Sequelize;

const ProductSubCategory = db.define(
	"product_sub_categories",
	{
		product_sub_category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
		},
		sub_category_id: {
			type: DataTypes.INTEGER,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
	}
);

Product.hasMany(ProductSubCategory, { foreignKey: "product_id" });
ProductSubCategory.belongsTo(Product, { foreignKey: "product_id" });

SubCategory.hasMany(ProductSubCategory, { foreignKey: "sub_category_id" });
ProductSubCategory.belongsTo(SubCategory, { foreignKey: "sub_category_id" });

export default ProductSubCategory;
