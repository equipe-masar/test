const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserCorge = sequelize.define(
  "UserCorge",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_corge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    tableName: "usercorge",
    timestamps: false
  }
);

module.exports = UserCorge;
