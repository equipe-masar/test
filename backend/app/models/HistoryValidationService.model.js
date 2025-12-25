const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const ValidationService = require("./ValidationService.model");

const HistoryValidationService = sequelize.define(
  "HistoryValidationService",
  {
    id_personnel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Personnel,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    id_validationService: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ValidationService,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "history_validation_services",
    timestamps: true
  }
);

module.exports = HistoryValidationService;
