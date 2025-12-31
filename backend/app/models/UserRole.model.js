const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define("UserRole", {
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: "userrole",
  timestamps: false
});

module.exports = UserRole;
