const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Categorie_grade = require("./Categorie_Grade.model");

const Grade = sequelize.define("Grade", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abrv_libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Foreign key to Categorie_grade

module.exports = Grade;
