const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryCarteMilitaire,
  getHistoryCarteMilitaireById,
  createHistoryCarteMilitaire,
  updateHistoryCarteMilitaire,
  deleteHistoryCarteMilitaire
} = require("../controllers/HistoryCarteMilitaire.controller");

const historyCarteRouter = Router();

// CRUD routes
historyCarteRouter.get("/", authMiddleware, getAllHistoryCarteMilitaire);
historyCarteRouter.get("/:id", authMiddleware, getHistoryCarteMilitaireById);
historyCarteRouter.post("/", authMiddleware, createHistoryCarteMilitaire);
historyCarteRouter.put("/:id", authMiddleware, updateHistoryCarteMilitaire);
historyCarteRouter.delete("/:id", authMiddleware, deleteHistoryCarteMilitaire);

module.exports = historyCarteRouter;
