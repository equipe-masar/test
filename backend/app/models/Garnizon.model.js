const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Garnizon = sequelize.define("Garnizon",   
  {
    libelle: DataTypes.STRING,
  }
);


module.exports = Garnizon;