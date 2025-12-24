const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrigineRecrutement = sequelize.define("OrigineRecrutement", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = OrigineRecrutement;
