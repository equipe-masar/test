const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryAccidents,
  getHistoryAccidentById,
  createHistoryAccident,
  updateHistoryAccident,
  deleteHistoryAccident
} = require("../controllers/HistoryAccident.controller");

const historyAccidentRouter = Router();

// CRUD routes
historyAccidentRouter.get("/", authMiddleware, getAllHistoryAccidents);
historyAccidentRouter.get("/:id", authMiddleware, getHistoryAccidentById);
historyAccidentRouter.post("/", authMiddleware, createHistoryAccident);
historyAccidentRouter.put("/:id", authMiddleware, updateHistoryAccident);
historyAccidentRouter.delete("/:id", authMiddleware, deleteHistoryAccident);

module.exports = historyAccidentRouter;
