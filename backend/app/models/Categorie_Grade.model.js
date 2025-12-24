const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Categorie_grade = sequelize.define("Categorie_grade", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abrv_libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Categorie_grade;
