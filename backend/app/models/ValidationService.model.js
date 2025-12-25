const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ValidationService = sequelize.define(
  "ValidationService",
  {
    libelle: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "validation_services",
    timestamps: true
  }
);

module.exports = ValidationService;
