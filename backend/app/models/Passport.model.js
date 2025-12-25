const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Passport = sequelize.define("Passport", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duree: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "passports",
  timestamps: true
});

module.exports = Passport;
