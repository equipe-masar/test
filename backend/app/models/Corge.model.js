const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Armee = require("./Armee.model");
const Garnizon = require("./Garnizon.model");
const Brigade = require("./Brigade.model");
const Region = require("./Region.model");
const Division = require("./Division.model");


const Corge = sequelize.define("Corge", {
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abrv_libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Foreign keys
Corge.belongsTo(Armee, { foreignKey: "id_arme", as: "armee" });
Corge.belongsTo(Garnizon, { foreignKey: "id_garnizon", as: "garnizon" });
Corge.belongsTo(Brigade, { foreignKey: "id_brigade", as: "brigade" });
Corge.belongsTo(Region, { foreignKey: "id_region", as: "region" });

// Self-referential FK (optional support)
Corge.belongsTo(Corge, { foreignKey: "id_corge_soutient", as: "soutient" });

module.exports = Corge;
