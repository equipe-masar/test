const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NoteAnnuelle = sequelize.define("NoteAnnuelle", {
  id_annuelle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note_annuelle: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_note_annuelle: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING,
  },
});

module.exports = NoteAnnuelle;
