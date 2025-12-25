const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = require("./Role.model");

const Permission = sequelize.define(
  "Permission",
  {
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    permission_json: {
      type: DataTypes.TEXT, // MSSQL: store JSON as text
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("permission_json");
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue("permission_json", JSON.stringify(value));
      }
    }
  },
  {
    tableName: "permissions",
    timestamps: true
  }
);

module.exports = Permission;
