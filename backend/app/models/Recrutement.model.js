const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Recrutement = sequelize.define("Recrutement", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  abrv_libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Recrutement;
