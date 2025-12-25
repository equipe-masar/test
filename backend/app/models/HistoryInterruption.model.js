const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Personnel = require("./Personnel.model");
const Interruption = require("./Interruption.model");

const HistoryInterruption = sequelize.define("HistoryInterruption", {
  id_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personnel,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  id_interruption: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Interruption,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
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
  tableName: "history_interruption",
  timestamps: false
});

module.exports = HistoryInterruption;
