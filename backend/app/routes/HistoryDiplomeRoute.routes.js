const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryDiplomes,
  getHistoryDiplomeById,
  createHistoryDiplome,
  updateHistoryDiplome,
  deleteHistoryDiplome
} = require("../controllers/HistoryDiplome.controller");

const historyDiplomeRouter = Router();

// CRUD routes
historyDiplomeRouter.get("/", authMiddleware, getAllHistoryDiplomes);
historyDiplomeRouter.get("/:id", authMiddleware, getHistoryDiplomeById);
historyDiplomeRouter.post("/", authMiddleware, createHistoryDiplome);
historyDiplomeRouter.put("/:id", authMiddleware, updateHistoryDiplome);
historyDiplomeRouter.delete("/:id", authMiddleware, deleteHistoryDiplome);

module.exports = historyDiplomeRouter;
