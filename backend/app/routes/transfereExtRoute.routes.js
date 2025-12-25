const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllTransfereExts,
  getTransfereExtByPersonnel,
  addTransfereExt,
  updateTransfereExt,
  deleteTransfereExt
} = require("../controllers/TransfereExt.controller");

const router = Router();

// Get all external transfers
router.get("/", authMiddleware, getAllTransfereExts);

// Get transfers for one personnel
router.get("/personnel/:personnelId", authMiddleware, getTransfereExtByPersonnel);

// Add a new external transfer
router.post("/", authMiddleware, addTransfereExt);

// Update an external transfer
router.put("/:id", authMiddleware, updateTransfereExt);

// Delete an external transfer
router.delete("/:id", authMiddleware, deleteTransfereExt);

module.exports = router;
