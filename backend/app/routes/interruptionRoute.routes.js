const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllInterruptions,
  getInterruptionById,
  addInterruption,
  updateInterruption,
  deleteInterruption
} = require("../controllers/Interruption.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllInterruptions);
router.get("/:id", authMiddleware, getInterruptionById);
router.post("/", authMiddleware, addInterruption);
router.put("/:id", authMiddleware, updateInterruption);
router.delete("/:id", authMiddleware, deleteInterruption);

module.exports = router;
