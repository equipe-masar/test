const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllFonctions,
  getFonctionById,
  createFonction,
  updateFonction,
  deleteFonction
} = require("../controllers/Fonction.controller");

const fonctionRouter = Router();

// CRUD routes
fonctionRouter.get("/", authMiddleware, getAllFonctions);
fonctionRouter.get("/:id", authMiddleware, getFonctionById);
fonctionRouter.post("/", authMiddleware, createFonction);
fonctionRouter.put("/:id", authMiddleware, updateFonction);
fonctionRouter.delete("/:id", authMiddleware, deleteFonction);

module.exports = fonctionRouter;
