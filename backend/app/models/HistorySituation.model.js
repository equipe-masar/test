const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const SituationSS = require("./SituationSS.model");

const HistorySituation = sequelize.define("HistorySituation", {
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
  id_situationSS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SituationSS,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  dtsit: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_situations",
  timestamps: true
});



module.exports = HistorySituation;
