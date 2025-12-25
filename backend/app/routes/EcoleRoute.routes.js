const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllEcoles,
  getEcoleById,
  createEcole,
  updateEcole,
  deleteEcole
} = require("../controllers/Ecole.controller");

const ecoleRouter = Router();

// CRUD routes
ecoleRouter.get("/", authMiddleware, getAllEcoles);
ecoleRouter.get("/:id", authMiddleware, getEcoleById);
ecoleRouter.post("/", authMiddleware, createEcole);
ecoleRouter.put("/:id", authMiddleware, updateEcole);
ecoleRouter.delete("/:id", authMiddleware, deleteEcole);

module.exports = ecoleRouter;
