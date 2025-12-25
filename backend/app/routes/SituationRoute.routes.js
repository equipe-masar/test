const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllSituations,
  getSituationById,
  createSituation,
  updateSituation,
  deleteSituation
} = require("../controllers/Situation.controller");

const situationRouter = Router();

// CRUD routes
situationRouter.get("/", authMiddleware, getAllSituations);
situationRouter.get("/:id", authMiddleware, getSituationById);
situationRouter.post("/", authMiddleware, createSituation);
situationRouter.put("/:id", authMiddleware, updateSituation);
situationRouter.delete("/:id", authMiddleware, deleteSituation);

module.exports = situationRouter;
