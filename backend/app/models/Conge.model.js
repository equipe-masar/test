const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Conge = sequelize.define("Conge", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Conge;
