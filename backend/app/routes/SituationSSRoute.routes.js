const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllSituationSS,
  getSituationSSById,
  createSituationSS,
  updateSituationSS,
  deleteSituationSS
} = require("../controllers/SituationSS.controller");

const situationSSRouter = Router();

// CRUD routes
situationSSRouter.get("/", authMiddleware, getAllSituationSS);
situationSSRouter.get("/:id", authMiddleware, getSituationSSById);
situationSSRouter.post("/", authMiddleware, createSituationSS);
situationSSRouter.put("/:id", authMiddleware, updateSituationSS);
situationSSRouter.delete("/:id", authMiddleware, deleteSituationSS);

module.exports = situationSSRouter;
