const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Sanction = sequelize.define("Sanction", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Sanction;
