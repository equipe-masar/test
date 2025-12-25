const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllPays,
  getPaysById,
  createPays,
  updatePays,
  deletePays
} = require("../controllers/Pays.controller");

const paysRouter = Router();

// CRUD routes
paysRouter.get("/", authMiddleware, getAllPays);
paysRouter.get("/:id", authMiddleware, getPaysById);
paysRouter.post("/", authMiddleware, createPays);
paysRouter.put("/:id", authMiddleware, updatePays);
paysRouter.delete("/:id", authMiddleware, deletePays);

module.exports = paysRouter;
