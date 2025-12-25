const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Conge = require("./Conge.model");
const Pays = require("./Pays.model");

const HistoryConge = sequelize.define("HistoryConge", {
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
  id_conge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conge,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  id_pays: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Pays,
      key: "id"
    },
    onDelete: "SET NULL",
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
  adresse: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_conges",
  timestamps: true
});

// Associations
HistoryConge.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryConge.belongsTo(Conge, { foreignKey: "id_conge", as: "conge" });
HistoryConge.belongsTo(Pays, { foreignKey: "id_pays", as: "pays" });

module.exports = HistoryConge;
