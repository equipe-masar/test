const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Accident = require("./Accident.model");

const HistoryAccident = sequelize.define("HistoryAccident", {
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
  id_accident: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Accident,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dtacc: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_accidents",
  timestamps: true
});




module.exports = HistoryAccident;
