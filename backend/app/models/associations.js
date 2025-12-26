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
const User = require("./User.model");
const UserCorge = require("./UserCorge.model");
const Role = require("./Role.model");
const UserRole = require("./UserRole.model");
const Armee = require("./Armee.model");
const Garnizon = require("./Garnizon.model");
const Brigade = require("./Brigade.model");
const Region = require("./Region.model");
const UserCategorieGrade = require("./UserCategorieGrade.model");
const HistoryUser = require("./HistoryUser.model");
const HistoryGrade = require("./HistoryGrade.model");
const TransfereExt = require("./TransfereExt.model");
const TransfereInter = require("./TransfereInter.model");
const Interruption = require("./Interruption.model");
const HistoryInterruption = require("./HistoryInterruption.model");
const HistoryPromotion = require("./HistoryPromotion.model");
const Promotion = require("./Promotion.model");
const Fonction = require("./Fonction.model");
const HistoryFunction = require("./HistoryFunction.model");
const Ecole = require("./Ecole.model");
const Pays = require("./Pays.model");
const HistoryDiplome = require("./HistoryDiplome.model");
const Diplome = require("./Diplome.model");
const HistoryPassport = require("./HistoryPassport.model");
const Passport = require("./Passport.model");
const HistoryContrat = require("./HistoryContrat.model");
const Contrat = require("./Contrat.model");
const HistoryAccident = require("./HistoryAccident.model");
const Accident = require("./Accident.model");
const SituationSS = require("./SituationSS.model");
const SituationSP = require("./SituationSP.model");
const HistorySituation = require("./HistorySituation.model");
const HistorySanction = require("./HistorySanction.model");
const Sanction = require("./Sanction.model");
const NoteNuit = require("./NoteNuit.model");




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
Personnel.belongsTo(Delegation, { foreignKey: "id_delegation", as: "delegation" });
Personnel.belongsTo(Recrutement, { foreignKey: "id_recrutement", as: "recrutement" });
Personnel.belongsTo(OrigineRecrutement, { foreignKey: "id_origine_recrutement", as: "origineRecrutement" });
Personnel.belongsTo(GroupeSanguin, { foreignKey: "id_grpsanguin", as: "groupeSanguin" });
Personnel.belongsTo(NiveauScolaire, { foreignKey: "id_niveau_scolaire", as: "niveauScolaire" });
/*****   */
// Foreign keys
Corge.belongsTo(Armee, { foreignKey: "id_arme", as: "armee" });
Corge.belongsTo(Garnizon, { foreignKey: "id_garnizon", as: "garnizon" });
Corge.belongsTo(Brigade, { foreignKey: "id_brigade", as: "brigade" });
Corge.belongsTo(Region, { foreignKey: "id_region", as: "region" });
Corge.belongsTo(Corge, { foreignKey: "id_corge_soutient", as: "soutient" });
/*****   */
User.belongsToMany(Corge, {  through: UserCorge,  foreignKey: "id_user",  otherKey: "id_corge",  as: "corges"});
Corge.belongsToMany(User, {  through: UserCorge,  foreignKey: "id_corge",  otherKey: "id_user",  as: "users"});
/*****   */
User.belongsToMany(Role, {  through: UserRole,  foreignKey: "id_user",  otherKey: "id_role",  as: "roles"});
Role.belongsToMany(User, {  through: UserRole,  foreignKey: "id_role",  otherKey: "id_user",  as: "users"});
/*****   */
User.belongsToMany(Categorie_grade, {  through: UserCategorieGrade,  foreignKey: "id_user",  otherKey: "id_cat_grade",  as: "categorieGrades"});
Categorie_grade.belongsToMany(User, {  through: UserCategorieGrade,  foreignKey: "id_cat_grade",  otherKey: "id_user",  as: "users"});
/*****   */
User.hasMany(HistoryUser, { foreignKey: "id_user", as: "history" });
HistoryUser.belongsTo(User, { foreignKey: "id_user", as: "user" });
//*****/

Grade.hasMany(HistoryGrade, { foreignKey: "id_grade", as: "historyGrades" });
HistoryGrade.belongsTo(Grade, { foreignKey: "id_grade", as: "grade" });
Personnel.hasMany(HistoryGrade, { foreignKey: "id_personnel", as: "historyGrades" });
HistoryGrade.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
//*****/
// Personnel has many external transfers
Personnel.hasMany(TransfereExt, { foreignKey: "id_personnel", as: "transfereExts" });
TransfereExt.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });

// Corge has many external transfers
Corge.hasMany(TransfereExt, { foreignKey: "id_corge", as: "transfereExts" });
TransfereExt.belongsTo(Corge, { foreignKey: "id_corge", as: "corge" });
//*****/

// Personnel has many internal transfers
Personnel.hasMany(TransfereInter, { foreignKey: "id_personnel", as: "transfereInters" });
TransfereInter.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });

// Departement has many internal transfers
Departement.hasMany(TransfereInter, { foreignKey: "id_departement", as: "transfereInters" });
TransfereInter.belongsTo(Departement, { foreignKey: "id_departement", as: "departement" });
//*****/
// Personnel has many interruptions
Personnel.hasMany(HistoryInterruption, { foreignKey: "id_personnel", as: "historyInterruptions" });
HistoryInterruption.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });

// Interruption has many history entries
Interruption.hasMany(HistoryInterruption, { foreignKey: "id_interruption", as: "historyEntries" });
HistoryInterruption.belongsTo(Interruption, { foreignKey: "id_interruption", as: "interruption" });

//*****/
HistoryPromotion.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryPromotion.belongsTo(Promotion, { foreignKey: "id_promotion", as: "promotion" });
//******/

//***
HistoryFunction.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryFunction.belongsTo(Fonction, { foreignKey: "id_fonction", as: "fonction" });

// */

Ecole.belongsTo(Pays, { foreignKey: "id_pays", as: "pays" });

//***
HistoryDiplome.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryDiplome.belongsTo(Diplome, { foreignKey: "id_diplome", as: "diplome" });
HistoryDiplome.belongsTo(Ecole, { foreignKey: "id_ecole", as: "ecole" });
//  */
//***
HistoryPassport.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryPassport.belongsTo(Passport, { foreignKey: "id_passport", as: "passport" });
//  */

HistoryContrat.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryContrat.belongsTo(Contrat, { foreignKey: "id_contrat", as: "contrat" });
//  */

HistoryAccident.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistoryAccident.belongsTo(Accident, { foreignKey: "id_accident", as: "accident" });
//  */
SituationSS.belongsTo(SituationSP, { foreignKey: "id_situation_sp", as: "situation_sp" });
//  */
HistorySituation.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistorySituation.belongsTo(SituationSS, { foreignKey: "id_situationSS", as: "situationSS" });
//  */
HistorySanction.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
HistorySanction.belongsTo(Sanction, { foreignKey: "id_sanction", as: "sanction" });
//  */
NoteNuit.belongsTo(Personnel, { foreignKey: "id_personnel", as: "personnel" });
//  */