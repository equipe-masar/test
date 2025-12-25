const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
} = require("../controllers/Promotion.controller");

const promotionRouter = Router();

// CRUD routes
promotionRouter.get("/", authMiddleware, getAllPromotions);
promotionRouter.get("/:id", authMiddleware, getPromotionById);
promotionRouter.post("/", authMiddleware, createPromotion);
promotionRouter.put("/:id", authMiddleware, updatePromotion);
promotionRouter.delete("/:id", authMiddleware, deletePromotion);

module.exports = promotionRouter;
