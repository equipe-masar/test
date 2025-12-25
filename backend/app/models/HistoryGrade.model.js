const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Grade = require("./Grade.model");
const Personnel = require("./Personnel.model"); // Correct model

const HistoryGrade = sequelize.define("HistoryGrade", {
  id_grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Grade,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  id_personnel: {  // updated column name
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personnel,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  dtgrade: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ref_grade: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_grade",
  timestamps: false
});

module.exports = HistoryGrade;
