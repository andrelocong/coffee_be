import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Role from "./Role.js";

const { DataTypes } = Sequelize;

const User = db.define(
	"users",
	{
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
		},
		last_name: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
		role_id: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
	}
);

export default User;

Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });
