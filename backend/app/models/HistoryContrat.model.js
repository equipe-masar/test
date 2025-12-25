const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Contrat = require("./Contrat.model");

const HistoryContrat = sequelize.define("HistoryContrat", {
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
  id_contrat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Contrat,
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
    allowNull: true
  }
}, {
  tableName: "history_contrats",
  timestamps: true
});



module.exports = HistoryContrat;
