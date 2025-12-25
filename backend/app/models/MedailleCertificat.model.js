const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MedailleCertificat = sequelize.define("MedailleCertificat", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cat: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = MedailleCertificat;
