const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Situation = sequelize.define("Situation", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "situations",
  timestamps: true
});

module.exports = Situation;
