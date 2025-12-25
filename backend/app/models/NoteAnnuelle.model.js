const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");

const NoteAnnuelle = sequelize.define(
  "NoteAnnuelle",
  {
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
    note: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "note_annuelles",
    timestamps: true
  }
);

module.exports = NoteAnnuelle;
