const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Passport = require("./Passport.model");

const HistoryPassport = sequelize.define("HistoryPassport", {
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
  id_passport: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Passport,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  num_passport: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  critere: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "history_passports",
  timestamps: true
});




module.exports = HistoryPassport;
