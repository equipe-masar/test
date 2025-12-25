const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SituationSP = sequelize.define("SituationSP", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "situation_sps",
  timestamps: true
});

module.exports = SituationSP;
