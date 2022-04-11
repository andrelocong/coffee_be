import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Product from "./Product.js";
import Category from "./Category.js";

const { DataTypes } = Sequelize;

const ProductCategory = db.define(
	"product_categories",
	{
		product_category_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		product_id: {
			type: DataTypes.STRING,
		},
		category_id: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

Product.hasMany(ProductCategory, { foreignKey: "product_id" });
ProductCategory.belongsTo(Product, { foreignKey: "product_id" });

Category.hasMany(ProductCategory, { foreignKey: "category_id" });
ProductCategory.belongsTo(Category, { foreignKey: "category_id" });

export default ProductCategory;
