const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Sanction = require("./Sanction.model");

const HistorySanction = sequelize.define("HistorySanction", {
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
  id_sanction: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sanction,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  date_sanction: {
    type: DataTypes.DATE,
    allowNull: false
  },
  taux: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_sanctions",
  timestamps: true
});



module.exports = HistorySanction;
