const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Departement = sequelize.define("Departement", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Associations will be set in a separate file to avoid circular dependencies
module.exports = Departement;
