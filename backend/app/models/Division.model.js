const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Corge = require("./Corge.model");

const Division = sequelize.define("Division", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Division belongs to Corge

module.exports = Division;
