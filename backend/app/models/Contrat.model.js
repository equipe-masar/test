const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contrat = sequelize.define("Contrat", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "contrats",
  timestamps: true
});

module.exports = Contrat;
