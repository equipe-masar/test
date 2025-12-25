const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Personnel = require("./Personnel.model");
const Corge = require("./Corge.model");

const TransfereExt = sequelize.define("TransfereExt", {
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
  id_corge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Corge,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  dttranExt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ref_tran_ext: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "transfere_ext",
  timestamps: false
});

module.exports = TransfereExt;
