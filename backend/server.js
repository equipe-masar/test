const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./app/config/.env" });
require("./app/models/associations"); // set up associations

const sequelize = require("./app/config/db");
const userRouter = require("./app/routes/userRoute.routes");
const brigadeRouter = require("./app/routes/brigadeRoute.routes");
const armeeRouter = require("./app/routes/armeeRoute.routes");
const garnizonRouter = require("./app/routes/garnizonRoute.routes");
const categorie_gradeRouter = require("./app/routes/categorie_gradeRoute.routes");
const regionRouter = require("./app/routes/regionRoute.routes");
const corgeRouter = require("./app/routes/corgeRoute.routes");
const gradeRouter = require("./app/routes/gradeRoute.routes");
const divisionRouter = require("./app/routes/divisionRoute.routes");
const departementRouter = require("./app/routes/departementRoute.routes");
const gouvernementRouter = require("./app/routes/gouvernementRoute.routes");
const authMiddleware = require("./app/middleware/auth.middleware");
const delegationRouter = require("./app/routes/delegationRoute.routes");
const typePassortRouter = require("./app/routes/typePassportRoute.routes");
const GroupeSanguinRouter = require("./app/routes/groupeSanguinRoute.routes");
const fonctionRouter = require("./app/routes/fonctionRoute.routes");
const accidentRouter = require("./app/routes/accidentRoute.routes");
const niveauScolaireRouter = require("./app/routes/niveauScolaireRoute.routes");
const recrutementRouter = require("./app/routes/recrutementRoute.routes");
const origineRecrutementRouter = require("./app/routes/origineRecrutementRoute.routes");
const personnelRouter = require("./app/routes/personnelRoute.routes");
const userCorgeRouter = require("./app/routes/userCorgeRoute.routes");
const userroleRouter = require("./app/routes/userRoleRoute.routes");
const roleRouter = require("./app/routes/roleRoute.routes");
const usercategoriegradeRouter = require("./app/routes/userCategorieGradeRoute.routes");
const HistoryUserRouter = require("./app/routes/historyUserRoute.routes");
const HistoryGradeRouter = require("./app/routes/historyGradeRoute.routes");
const transfereExtRouter = require("./app/routes/transfereExtRoute.routes");
const transfereInterRouter = require("./app/routes/transfereInterRoute.routes");
const interruptuonRouter = require("./app/routes/interruptionRoute.routes");
const historyInterruptionRouter = require("./app/routes/historyInterruptionRoute.routes");
const SanctionRouter = require('./app/routes/sanctionRoute.routes');
const promotionRouter = require('./app/routes/PromotionRoute.routes');
const DiplomeRouter = require('./app/routes/diplomeRoute.routes');
const HistoryPromotionRouter = require('./app/routes/HistoryPromotionRoute.routes');
const HistoryFunctionRouter = require('./app/routes/HistoryFunctionRoute.routes');
const CongeRouter = require('./app/routes/CongeRoute.routes');
const PaysRouter = require('./app/routes/PaysRoute.routes');
const HistoryCongeRouter = require('./app/routes/HistoryCongeRoute.routes');
const EcoleRouter = require('./app/routes/EcoleRoute.routes');
const HistoryDiplomeRouter = require('./app/routes/HistoryDiplomeRoute.routes');
const PassportRouter = require('./app/routes/PassportRoute.routes');
const HistoryPassportRouter = require('./app/routes/HistoryPassportRoute.routes');
const ContratRouter = require('./app/routes/ContratRoute.routes');
const HistoryContratRouter = require('./app/routes/HistoryContratRoute.routes');




const app = express();
const port = process.env.PORT || 9000;
const api_prefix = process.env.API_PREFIX || "/api";

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors({
  origin: true,           // allow Postman & browser
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// --------------------
// ROUTES
// --------------------
app.use(`${api_prefix}/user`, userRouter);
app.use(`${api_prefix}/brigade`, brigadeRouter);
app.use(`${api_prefix}/armee`, armeeRouter);
app.use(`${api_prefix}/garnizon`, garnizonRouter);
app.use(`${api_prefix}/categorie_grade`, categorie_gradeRouter);
app.use(`${api_prefix}/region`, regionRouter);
app.use(`${api_prefix}/corge`, corgeRouter);
app.use(`${api_prefix}/grade`, gradeRouter);
app.use(`${api_prefix}/division`, divisionRouter);
app.use(`${api_prefix}/departement`, departementRouter);
app.use(`${api_prefix}/gouvernement`, gouvernementRouter);
app.use(`${api_prefix}/delegation`, delegationRouter);
app.use(`${api_prefix}/type_passport`, typePassortRouter);
app.use(`${api_prefix}/groupe_sanguin`, GroupeSanguinRouter);
app.use(`${api_prefix}/fonction`, fonctionRouter);
app.use(`${api_prefix}/accident`, accidentRouter);
app.use(`${api_prefix}/niveauScolaire`, niveauScolaireRouter);
app.use(`${api_prefix}/recrutement`, recrutementRouter);
app.use(`${api_prefix}/origineRecrutement`, origineRecrutementRouter);
app.use(`${api_prefix}/personnel`, personnelRouter);
app.use(`${api_prefix}/usercorge`, userCorgeRouter);
app.use(`${api_prefix}/userrole`, userroleRouter);
app.use(`${api_prefix}/role`, roleRouter);
app.use(`${api_prefix}/usercategoriegrade`, usercategoriegradeRouter);
app.use(`${api_prefix}/historyuser`, HistoryUserRouter);
app.use(`${api_prefix}/historygrade`, HistoryGradeRouter);
app.use(`${api_prefix}/transfereext`, transfereExtRouter);
app.use(`${api_prefix}/transfereinter`, transfereInterRouter);
app.use(`${api_prefix}/interruption`, interruptuonRouter);
app.use(`${api_prefix}/historyinterruption`, historyInterruptionRouter);
app.use(`${api_prefix}/sanction`, SanctionRouter);
app.use(`${api_prefix}/promotion`, promotionRouter);
app.use(`${api_prefix}/diplome`, DiplomeRouter);
app.use(`${api_prefix}/historypromotion`, HistoryPromotionRouter);
app.use(`${api_prefix}/historyfunction`, HistoryFunctionRouter);
app.use(`${api_prefix}/conge`, CongeRouter);
app.use(`${api_prefix}/pays`, PaysRouter);
app.use(`${api_prefix}/historyconge`, HistoryCongeRouter);
app.use(`${api_prefix}/ecole`, EcoleRouter);
app.use(`${api_prefix}/historydiplome`, HistoryDiplomeRouter);
app.use(`${api_prefix}/passport`, PassportRouter);
app.use(`${api_prefix}/historypassport`, HistoryPassportRouter);
app.use(`${api_prefix}/contrat`, ContratRouter);
app.use(`${api_prefix}/historycontrat`, HistoryContratRouter);




// --------------------
// PROTECTED EXAMPLE ROUTE
// --------------------
app.get(`${api_prefix}/admin/dashboard`, authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the admin dashboard!",
    userId: req.user.userId
  });
});

// --------------------
// START SERVER
// --------------------
sequelize.sync(
 { force: true }  // Use { force: true } to drop and recreate tables on every server start (data loss)
)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Database synchronization error:", err);
  });
