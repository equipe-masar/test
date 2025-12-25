const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");

const HistoryCarteMil = sequelize.define(
  "HistoryCarteMil",
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
    num_carte: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "history_carte_mils",
    timestamps: true
  }
);

module.exports = HistoryCarteMil;
