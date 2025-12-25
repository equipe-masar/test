const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistorySituations,
  getHistorySituationById,
  createHistorySituation,
  updateHistorySituation,
  deleteHistorySituation
} = require("../controllers/HistorySituation.controller");

const historySituationRouter = Router();

// CRUD routes
historySituationRouter.get("/", authMiddleware, getAllHistorySituations);
historySituationRouter.get("/:id", authMiddleware, getHistorySituationById);
historySituationRouter.post("/", authMiddleware, createHistorySituation);
historySituationRouter.put("/:id", authMiddleware, updateHistorySituation);
historySituationRouter.delete("/:id", authMiddleware, deleteHistorySituation);

module.exports = historySituationRouter;
