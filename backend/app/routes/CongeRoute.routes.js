const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllConges,
  getCongeById,
  createConge,
  updateConge,
  deleteConge
} = require("../controllers/Conge.controller");

const congeRouter = Router();

// CRUD routes
congeRouter.get("/", authMiddleware, getAllConges);
congeRouter.get("/:id", authMiddleware, getCongeById);
congeRouter.post("/", authMiddleware, createConge);
congeRouter.put("/:id", authMiddleware, updateConge);
congeRouter.delete("/:id", authMiddleware, deleteConge);

module.exports = congeRouter;
