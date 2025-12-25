const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllDiplomes,
  getDiplomeById,
  createDiplome,
  updateDiplome,
  deleteDiplome
} = require("../controllers/Diplome.controller");

const diplomeRouter = Router();

// CRUD routes
diplomeRouter.get("/", authMiddleware, getAllDiplomes);
diplomeRouter.get("/:id", authMiddleware, getDiplomeById);
diplomeRouter.post("/", authMiddleware, createDiplome);
diplomeRouter.put("/:id", authMiddleware, updateDiplome);
diplomeRouter.delete("/:id", authMiddleware, deleteDiplome);

module.exports = diplomeRouter;
