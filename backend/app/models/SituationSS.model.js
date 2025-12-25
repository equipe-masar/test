const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SituationSP = require("./SituationSP.model");

const SituationSS = sequelize.define("SituationSS", {
  id_situation_sp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SituationSP,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "situation_ss",
  timestamps: true
});



module.exports = SituationSS;
