const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllSituationSPs,
  getSituationSPById,
  createSituationSP,
  updateSituationSP,
  deleteSituationSP
} = require("../controllers/SituationSP.controller");

const situationSPRouter = Router();

// CRUD routes
situationSPRouter.get("/", authMiddleware, getAllSituationSPs);
situationSPRouter.get("/:id", authMiddleware, getSituationSPById);
situationSPRouter.post("/", authMiddleware, createSituationSP);
situationSPRouter.put("/:id", authMiddleware, updateSituationSP);
situationSPRouter.delete("/:id", authMiddleware, deleteSituationSP);

module.exports = situationSPRouter;
