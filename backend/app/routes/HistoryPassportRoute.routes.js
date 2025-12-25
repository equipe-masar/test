const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryPassports,
  getHistoryPassportById,
  createHistoryPassport,
  updateHistoryPassport,
  deleteHistoryPassport
} = require("../controllers/HistoryPassport.controller");

const historyPassportRouter = Router();

// CRUD routes
historyPassportRouter.get("/", authMiddleware, getAllHistoryPassports);
historyPassportRouter.get("/:id", authMiddleware, getHistoryPassportById);
historyPassportRouter.post("/", authMiddleware, createHistoryPassport);
historyPassportRouter.put("/:id", authMiddleware, updateHistoryPassport);
historyPassportRouter.delete("/:id", authMiddleware, deleteHistoryPassport);

module.exports = historyPassportRouter;
