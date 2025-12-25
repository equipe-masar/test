const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryFunctions,
  getHistoryFunctionById,
  createHistoryFunction,
  updateHistoryFunction,
  deleteHistoryFunction
} = require("../controllers/HistoryFunction.controller");

const historyFunctionRouter = Router();

// CRUD routes
historyFunctionRouter.get("/", authMiddleware, getAllHistoryFunctions);
historyFunctionRouter.get("/:id", authMiddleware, getHistoryFunctionById);
historyFunctionRouter.post("/", authMiddleware, createHistoryFunction);
historyFunctionRouter.put("/:id", authMiddleware, updateHistoryFunction);
historyFunctionRouter.delete("/:id", authMiddleware, deleteHistoryFunction);

module.exports = historyFunctionRouter;
