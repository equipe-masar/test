const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Fonction = require("./Fonction.model");

const HistoryFunction = sequelize.define("HistoryFunction", {
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
  id_fonction: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fonction,
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
  tableName: "history_functions",
  timestamps: true
});



module.exports = HistoryFunction;
