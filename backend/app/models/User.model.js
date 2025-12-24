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
 
  userRole: DataTypes.STRING,
  state : DataTypes.STRING,
  
});


module.exports = User;
