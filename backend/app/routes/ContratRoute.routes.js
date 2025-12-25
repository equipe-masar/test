const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllContrats,
  getContratById,
  createContrat,
  updateContrat,
  deleteContrat
} = require("../controllers/Contrat.controller");

const contratRouter = Router();

// CRUD routes
contratRouter.get("/", authMiddleware, getAllContrats);
contratRouter.get("/:id", authMiddleware, getContratById);
contratRouter.post("/", authMiddleware, createContrat);
contratRouter.put("/:id", authMiddleware, updateContrat);
contratRouter.delete("/:id", authMiddleware, deleteContrat);

module.exports = contratRouter;
