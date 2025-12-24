const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllCategorieGrade,
  getCategorieGradeById,
  createCategorieGrade,
  updateCategorieGrade,
  deleteCategorieGrade
} = require("../controllers/CategorieGrade.controller");

const router = Router();

// --------------------
// CRUD ROUTES
// --------------------

// Get all categories
router.get("/", authMiddleware, getAllCategorieGrade);

// Get category by ID
router.get("/:id", authMiddleware, getCategorieGradeById);

// Create new category
router.post("/", authMiddleware, createCategorieGrade);

// Update category
router.put("/:id", authMiddleware, updateCategorieGrade);

// Delete category
router.delete("/:id", authMiddleware, deleteCategorieGrade);

module.exports = router;
