const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");



const Personnel = sequelize.define("Personnel", {
  matrecule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ppere: DataTypes.STRING,
  pgpere: DataTypes.STRING,
  pmere: DataTypes.STRING,
  dtnai: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ncin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  dtcin: DataTypes.DATEONLY,
  iu: {
    type: DataTypes.STRING,
    unique: true
  },
  adress: DataTypes.STRING,
  tel: {
    type: DataTypes.STRING(8),
    validate: {
      is: /^[0-9]{8}$/  // 8 digits only
    }
  },
  dtenrolement: DataTypes.DATEONLY,
  refenrolement: DataTypes.STRING,
  dtdetachement: DataTypes.DATEONLY,
  refdetachement: DataTypes.STRING
});



module.exports = Personnel;
