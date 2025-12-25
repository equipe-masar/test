const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Personnel = require("./Personnel.model");
const Departement = require("./Departement.model");

const TransfereInter = sequelize.define("TransfereInter", {
  id_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personnel,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  id_departement: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Departement,
      key: "id"
    }
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dttranInter: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "transfere_inter",
  timestamps: false
});

module.exports = TransfereInter;
