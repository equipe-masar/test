const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pays = require("./Pays.model");

const Ecole = sequelize.define("Ecole", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_pays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pays,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
}, {
  tableName: "ecoles",
  timestamps: true
});

// Associations


module.exports = Ecole;
