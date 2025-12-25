const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryValidationServices,
  getHistoryValidationServiceById,
  createHistoryValidationService,
  updateHistoryValidationService,
  deleteHistoryValidationService
} = require("../controllers/HistoryValidationService.controller");

const historyValidationServiceRouter = Router();

// CRUD routes
historyValidationServiceRouter.get("/", authMiddleware, getAllHistoryValidationServices);
historyValidationServiceRouter.get("/:id", authMiddleware, getHistoryValidationServiceById);
historyValidationServiceRouter.post("/", authMiddleware, createHistoryValidationService);
historyValidationServiceRouter.put("/:id", authMiddleware, updateHistoryValidationService);
historyValidationServiceRouter.delete("/:id", authMiddleware, deleteHistoryValidationService);

module.exports = historyValidationServiceRouter;
