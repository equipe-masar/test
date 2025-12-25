const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const HistoryUser = sequelize.define("HistoryUser", {
    
  id_user: {
    type: DataTypes.STRING, // match Users.username
    allowNull: false,
    references: {
      model: "Users",
      key: "username"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "history_user",
  timestamps: false
});
module.exports = HistoryUser;