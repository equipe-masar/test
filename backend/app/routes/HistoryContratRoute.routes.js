const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryContrats,
  getHistoryContratById,
  createHistoryContrat,
  updateHistoryContrat,
  deleteHistoryContrat
} = require("../controllers/HistoryContrat.controller");

const historyContratRouter = Router();

// CRUD routes
historyContratRouter.get("/", authMiddleware, getAllHistoryContrats);
historyContratRouter.get("/:id", authMiddleware, getHistoryContratById);
historyContratRouter.post("/", authMiddleware, createHistoryContrat);
historyContratRouter.put("/:id", authMiddleware, updateHistoryContrat);
historyContratRouter.delete("/:id", authMiddleware, deleteHistoryContrat);

module.exports = historyContratRouter;
