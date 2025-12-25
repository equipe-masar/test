const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryPromotions,
  getHistoryPromotionById,
  createHistoryPromotion,
  updateHistoryPromotion,
  deleteHistoryPromotion
} = require("../controllers/HistoryPromotion.controller");

const historyPromotionRouter = Router();

historyPromotionRouter.get("/", authMiddleware, getAllHistoryPromotions);
historyPromotionRouter.get("/:id", authMiddleware, getHistoryPromotionById);
historyPromotionRouter.post("/", authMiddleware, createHistoryPromotion);
historyPromotionRouter.put("/:id", authMiddleware, updateHistoryPromotion);
historyPromotionRouter.delete("/:id", authMiddleware, deleteHistoryPromotion);

module.exports = historyPromotionRouter;
