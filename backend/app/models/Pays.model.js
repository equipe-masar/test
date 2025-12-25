const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pays = sequelize.define("Pays", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Pays;
