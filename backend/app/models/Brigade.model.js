const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brigade = sequelize.define("Brigade",   
  {
    libelle: DataTypes.STRING,
  }
);


module.exports = Brigade;