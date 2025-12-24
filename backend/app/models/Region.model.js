const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Region = sequelize.define("Region", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Region;
