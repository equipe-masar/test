const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Armee = sequelize.define("Armee", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Armee;
