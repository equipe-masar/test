const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GroupeSanguin = sequelize.define("GroupeSanguin", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = GroupeSanguin;
