const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllGrade,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade
} = require("../controllers/Grade.controller");

const router = Router();

// --------------------
// CRUD ROUTES
// --------------------

// Get all grades
router.get("/", authMiddleware, getAllGrade);

// Get grade by ID
router.get("/:id", authMiddleware, getGradeById);

// Create new grade
router.post("/", authMiddleware, createGrade);

// Update grade
router.put("/:id", authMiddleware, updateGrade);

// Delete grade
router.delete("/:id", authMiddleware, deleteGrade);

module.exports = router;
