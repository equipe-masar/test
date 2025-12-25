const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryConges,
  getHistoryCongeById,
  createHistoryConge,
  updateHistoryConge,
  deleteHistoryConge
} = require("../controllers/HistoryConge.controller");

const historyCongeRouter = Router();

// CRUD routes
historyCongeRouter.get("/", authMiddleware, getAllHistoryConges);
historyCongeRouter.get("/:id", authMiddleware, getHistoryCongeById);
historyCongeRouter.post("/", authMiddleware, createHistoryConge);
historyCongeRouter.put("/:id", authMiddleware, updateHistoryConge);
historyCongeRouter.delete("/:id", authMiddleware, deleteHistoryConge);

module.exports = historyCongeRouter;
