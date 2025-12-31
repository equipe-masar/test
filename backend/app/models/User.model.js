const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true, // THIS IS ENOUGH
    // remove any "unique: true" if present
  },
  id_corge: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  userRole: DataTypes.STRING,
  state : DataTypes.STRING,
  
});


module.exports = User;
