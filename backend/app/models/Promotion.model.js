const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Promotion = sequelize.define("Promotion", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Promotion;
