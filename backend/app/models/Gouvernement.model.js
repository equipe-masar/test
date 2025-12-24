const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Gouvernement = sequelize.define("Gouvernement", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Associations can be added later if needed
module.exports = Gouvernement;
