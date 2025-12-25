const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Diplome = sequelize.define("Diplome", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type_diplome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Diplome;
