const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Interruption = sequelize.define("Interruption", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "interruption",
  timestamps: false
});

module.exports = Interruption;
