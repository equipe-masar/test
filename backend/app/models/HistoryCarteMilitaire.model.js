const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HistoryCarteMilitaire = sequelize.define("HistoryCarteMilitaire", {
  id_historyCarte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false
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
    allowNull: false
  }
});

module.exports = HistoryCarteMilitaire;
