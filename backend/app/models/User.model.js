const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true, // THIS IS ENOUGH
    // remove any "unique: true" if present
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  userRole: DataTypes.STRING,
});


module.exports = User;
