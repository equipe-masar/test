const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Accident = sequelize.define("Accident", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Accident;
