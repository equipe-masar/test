const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");

const NoteNuit = sequelize.define(
  "NoteNuit",
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
    dtnoteNuit: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trimestre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    valid_dgaaf: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "note_nuits",
    timestamps: true
  }
);

module.exports = NoteNuit;
