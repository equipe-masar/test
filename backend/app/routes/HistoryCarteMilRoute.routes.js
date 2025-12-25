const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryCarteMils,
  getHistoryCarteMilById,
  createHistoryCarteMil,
  updateHistoryCarteMil,
  deleteHistoryCarteMil
} = require("../controllers/HistoryCarteMil.controller");

const historyCarteMilRouter = Router();

// CRUD routes
historyCarteMilRouter.get("/", authMiddleware, getAllHistoryCarteMils);
historyCarteMilRouter.get("/:id", authMiddleware, getHistoryCarteMilById);
historyCarteMilRouter.post("/", authMiddleware, createHistoryCarteMil);
historyCarteMilRouter.put("/:id", authMiddleware, updateHistoryCarteMil);
historyCarteMilRouter.delete("/:id", authMiddleware, deleteHistoryCarteMil);

module.exports = historyCarteMilRouter;
