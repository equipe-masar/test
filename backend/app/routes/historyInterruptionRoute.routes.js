const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryInterruptions,
  getHistoryByPersonnel,
  addHistoryInterruption,
  updateHistoryInterruption,
  deleteHistoryInterruption
} = require("../controllers/HistoryInterruption.controller");

const router = Router();

// Get all interruptions history
router.get("/", authMiddleware, getAllHistoryInterruptions);

// Get interruptions history for one personnel
router.get("/personnel/:personnelId", authMiddleware, getHistoryByPersonnel);

// Add a new history entry
router.post("/", authMiddleware, addHistoryInterruption);

// Update a history entry
router.put("/:id", authMiddleware, updateHistoryInterruption);

// Delete a history entry
router.delete("/:id", authMiddleware, deleteHistoryInterruption);

module.exports = router;
