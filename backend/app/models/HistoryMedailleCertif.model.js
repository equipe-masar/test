const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const MedailleCertificat = require("./MedailleCertificat.model");

const HistoryMedailleCertif = sequelize.define(
  "HistoryMedailleCertif",
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
    id_medaillecertif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MedailleCertificat,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    dtmedailCertif: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "history_medaille_certifs",
    timestamps: true
  }
);

module.exports = HistoryMedailleCertif;
