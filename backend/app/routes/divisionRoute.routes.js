const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision
} = require("../controllers/Division.controller");

const router = Router();

// --------------------
// CRUD ROUTES
// --------------------

// Get all divisions
router.get("/", authMiddleware, getAllDivisions);

// Get division by ID
router.get("/:id", authMiddleware, getDivisionById);

// Create a new division
router.post("/", authMiddleware, createDivision);

// Update division
router.put("/:id", authMiddleware, updateDivision);

// Delete division
router.delete("/:id", authMiddleware, deleteDivision);

module.exports = router;
