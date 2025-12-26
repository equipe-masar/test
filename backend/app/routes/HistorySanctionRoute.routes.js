const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistorySanctions,
  getHistorySanctionById,
  createHistorySanction,
  updateHistorySanction,
  deleteHistorySanction
} = require("../controllers/HistorySanction.controller");

const historySanctionRouter = Router();

// CRUD routes
historySanctionRouter.get("/", authMiddleware, getAllHistorySanctions);
historySanctionRouter.get("/:id", authMiddleware, getHistorySanctionById);
historySanctionRouter.post("/", authMiddleware, createHistorySanction);
historySanctionRouter.put("/:id", authMiddleware, updateHistorySanction);
historySanctionRouter.delete("/:id", authMiddleware, deleteHistorySanction);

module.exports = historySanctionRouter;
