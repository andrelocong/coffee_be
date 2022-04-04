import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Product from "./Product.js";
import MainCategory from "./MainCategory.js";
import Category from "./Category.js";
import SubCategory from "./SubCategory.js";
import Quantity from "./Quantity.js";

const { DataTypes } = Sequelize;

const Order = db.define(
	"orders",
	{
		order_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		product_id: {
			type: DataTypes.INTEGER,
		},
		main_category_id: {
			type: DataTypes.INTEGER,
		},
		category_id: {
			type: DataTypes.INTEGER,
		},
		sub_category_id: {
			type: DataTypes.INTEGER,
		},
		quantity_id: {
			type: DataTypes.INTEGER,
		},
		note: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.STRING,
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

Product.hasMany(Order, { foreignKey: "product_id" });
Order.belongsTo(Product, { foreignKey: "product_id" });

MainCategory.hasMany(Order, { foreignKey: "main_category_id" });
Order.belongsTo(MainCategory, { foreignKey: "main_category_id" });

Category.hasMany(Order, { foreignKey: "category_id" });
Order.belongsTo(Category, { foreignKey: "category_id" });

SubCategory.hasMany(Order, { foreignKey: "sub_category_id" });
Order.belongsTo(SubCategory, { foreignKey: "sub_category_id" });

Quantity.hasMany(Order, { foreignKey: "quantity_id" });
Order.belongsTo(Quantity, { foreignKey: "quantity_id" });

export default Order;
