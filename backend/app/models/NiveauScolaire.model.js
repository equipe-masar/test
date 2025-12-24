const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NiveauScolaire = sequelize.define("NiveauScolaire", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = NiveauScolaire;
