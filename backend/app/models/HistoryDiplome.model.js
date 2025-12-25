const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Diplome = require("./Diplome.model");
const Ecole = require("./Ecole.model");

const HistoryDiplome = sequelize.define("HistoryDiplome", {
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
  id_diplome: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Diplome,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  id_ecole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ecole,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  date_diplome: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remarques: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_diplomes",
  timestamps: true
});




module.exports = HistoryDiplome;
