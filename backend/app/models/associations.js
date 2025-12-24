const Corge = require("./Corge.model");
const Division = require("./Division.model");
const Grade = require("./Grade.model");
const Categorie_grade = require("./Categorie_Grade.model");
const Departement = require("./Departement.model");





//*****/
Division.belongsTo(Corge, { foreignKey: "id_corge", as: "corge" });
Corge.hasMany(Division, { foreignKey: "id_corge", as: "divisions" });
//*****/
Grade.belongsTo(Categorie_grade, { foreignKey: "id_categorie_grade", as: "categorie" });
Categorie_grade.hasMany(Grade, { foreignKey: "id_categorie_grade", as: "grades" });
//*****/
Departement.belongsTo(Division, { foreignKey: "id_division", as: "division" });
Division.hasMany(Departement, { foreignKey: "id_division", as: "departements" });
//*****/
