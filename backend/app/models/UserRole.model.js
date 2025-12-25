const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define("UserRole", {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "userrole",
  timestamps: false
});

module.exports = UserRole;
