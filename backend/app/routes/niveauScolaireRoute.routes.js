const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllNiveauScolaire,
  getNiveauScolaireById,
  createNiveauScolaire,
  updateNiveauScolaire,
  deleteNiveauScolaire
} = require("../controllers/NiveauScolaire.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllNiveauScolaire);
router.get("/:id", authMiddleware, getNiveauScolaireById);
router.post("/", authMiddleware, createNiveauScolaire);
router.put("/:id", authMiddleware, updateNiveauScolaire);
router.delete("/:id", authMiddleware, deleteNiveauScolaire);

module.exports = router;
