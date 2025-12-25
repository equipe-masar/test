const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Personnel = require("./Personnel.model");
const Promotion = require("./Promotion.model");

const HistoryPromotion = sequelize.define("HistoryPromotion", {
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
  id_promotion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Promotion,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amuse: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "history_promotions",
  timestamps: true
});



module.exports = HistoryPromotion;
