const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllRecrutements,
  getRecrutementById,
  createRecrutement,
  updateRecrutement,
  deleteRecrutement
} = require("../controllers/Recrutement.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllRecrutements);
router.get("/:id", authMiddleware, getRecrutementById);
router.post("/", authMiddleware, createRecrutement);
router.put("/:id", authMiddleware, updateRecrutement);
router.delete("/:id", authMiddleware, deleteRecrutement);

module.exports = router;
