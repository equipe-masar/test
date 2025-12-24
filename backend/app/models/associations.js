const Corge = require("./Corge.model");
const Division = require("./Division.model");
const Grade = require("./Grade.model");
const Categorie_grade = require("./Categorie_Grade.model");
const Departement = require("./Departement.model");
const Delegation = require("./Delegation.model");
const Gouvernement = require("./Gouvernement.model");
const Personnel = require("./Personnel.model");
const Recrutement = require("./Recrutement.model");
const OrigineRecrutement = require("./OrigineRecrutement.model");
const GroupeSanguin = require("./GroupeSanguin.model");
const NiveauScolaire = require("./NiveauScolaire.model");




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
// Association: Delegation belongs to Gouvernement
Delegation.belongsTo(Gouvernement, {  foreignKey: "id_gouvernement",  as: "gouvernement"});
Gouvernement.hasMany(Delegation, {  foreignKey: "id_gouvernement",  as: "delegations"});
//*****/
// ------------------
// Foreign keys
// ------------------
Personnel.belongsTo(Delegation, { foreignKey: "id_delegation", as: "delegation" });
Personnel.belongsTo(Recrutement, { foreignKey: "id_recrutement", as: "recrutement" });
Personnel.belongsTo(OrigineRecrutement, { foreignKey: "id_origine_recrutement", as: "origineRecrutement" });
Personnel.belongsTo(GroupeSanguin, { foreignKey: "id_grpsanguin", as: "groupeSanguin" });
Personnel.belongsTo(NiveauScolaire, { foreignKey: "id_niveau_scolaire", as: "niveauScolaire" });
/*****   */
