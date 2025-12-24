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
const authMiddleware = require("./app/middleware/auth.middleware");

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
 //{ force: true }  // Use { force: true } to drop and recreate tables on every server start (data loss)
)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Database synchronization error:", err);
  });
