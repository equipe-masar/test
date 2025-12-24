const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Delegation = sequelize.define("Delegation", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});



module.exports = Delegation;
