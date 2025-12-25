const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
