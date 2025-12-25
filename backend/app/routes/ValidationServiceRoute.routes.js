const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllValidationServices,
  getValidationServiceById,
  createValidationService,
  updateValidationService,
  deleteValidationService
} = require("../controllers/ValidationService.controller");

const validationServiceRouter = Router();

// CRUD routes
validationServiceRouter.get("/", authMiddleware, getAllValidationServices);
validationServiceRouter.get("/:id", authMiddleware, getValidationServiceById);
validationServiceRouter.post("/", authMiddleware, createValidationService);
validationServiceRouter.put("/:id", authMiddleware, updateValidationService);
validationServiceRouter.delete("/:id", authMiddleware, deleteValidationService);

module.exports = validationServiceRouter;
