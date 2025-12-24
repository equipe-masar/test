const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TypePassport = sequelize.define("TypePassport", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER, // duration in months or years
    allowNull: false
  }
});

module.exports = TypePassport;
