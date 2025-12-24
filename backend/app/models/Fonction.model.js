const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Fonction = sequelize.define("Fonction", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Fonction;
