const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllTransfereInters,
  getTransfereInterByPersonnel,
  addTransfereInter,
  updateTransfereInter,
  deleteTransfereInter
} = require("../controllers/TransfereInter.controller");

const router = Router();

// Get all internal transfers
router.get("/", authMiddleware, getAllTransfereInters);

// Get transfers for one personnel
router.get("/personnel/:personnelId", authMiddleware, getTransfereInterByPersonnel);

// Add a new internal transfer
router.post("/", authMiddleware, addTransfereInter);

// Update an internal transfer
router.put("/:id", authMiddleware, updateTransfereInter);

// Delete an internal transfer
router.delete("/:id", authMiddleware, deleteTransfereInter);

module.exports = router;
