const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllGouvernements,
  getGouvernementById,
  createGouvernement,
  updateGouvernement,
  deleteGouvernement
} = require("../controllers/Gouvernement.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllGouvernements);
router.get("/:id", authMiddleware, getGouvernementById);
router.post("/", authMiddleware, createGouvernement);
router.put("/:id", authMiddleware, updateGouvernement);
router.delete("/:id", authMiddleware, deleteGouvernement);

module.exports = router;
