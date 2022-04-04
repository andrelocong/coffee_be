import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Role from "./Role.js";

const { DataTypes } = Sequelize;

const RoleAccess = db.define(
	"role_access",
	{
		role_access_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		menu: {
			type: DataTypes.STRING,
		},
		can_insert: {
			type: DataTypes.INTEGER,
		},
		can_update: {
			type: DataTypes.INTEGER,
		},
		can_delete: {
			type: DataTypes.INTEGER,
		},
		role_id: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
	}
);

Role.hasMany(RoleAccess, { foreignKey: "role_id" });
RoleAccess.belongsTo(Role, { foreignKey: "role_id" });

export default RoleAccess;
