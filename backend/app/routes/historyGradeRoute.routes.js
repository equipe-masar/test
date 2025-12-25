const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryGrades,
  getHistoryByPersonnel,
  addHistoryGrade,
  updateHistoryGrade,
  deleteHistoryGrade
} = require("../controllers/HistoryGrade.controller");

const router = Router();

// Get all history entries
router.get("/", authMiddleware, getAllHistoryGrades);

// Get history for a specific personnel
router.get("/personnel/:personnelId", authMiddleware, getHistoryByPersonnel);

// Add a new history entry
router.post("/", authMiddleware, addHistoryGrade);

// Update an existing history entry by ID
router.put("/:id", authMiddleware, updateHistoryGrade);

// Delete a history entry by ID
router.delete("/:id", authMiddleware, deleteHistoryGrade);

module.exports = router;
