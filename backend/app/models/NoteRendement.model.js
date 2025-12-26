const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NoteRendement = sequelize.define("NoteRendement", {
  id_note_rend: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note_rend: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_note_rend: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  annee_note_rend: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  semestre_note_rend: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING,
  },
  valid_note_rend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  valid_dgaaf_note_rend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = NoteRendement;
