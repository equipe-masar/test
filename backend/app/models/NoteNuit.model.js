const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");

const NoteNuit = sequelize.define("NoteNuit", {
  id_note_nuit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  note_nuit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_note_nuit: {
    type: DataTypes.DATE,
    allowNull: false
  },
  annee_note_nuit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trimestre_note_nuit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ref_note_nuit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  valid_note_nuit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  valid_dgaaf_note_nuit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "note_nuits",
  timestamps: true
});



module.exports = NoteNuit;
