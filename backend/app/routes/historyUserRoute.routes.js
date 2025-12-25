const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistory,
  getHistoryByUser,
  addHistory,
  updateHistory,
  deleteHistory
} = require("../controllers/HistoryUser.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllHistory);
router.get("/user/:userId", authMiddleware, getHistoryByUser);
router.post("/", authMiddleware, addHistory);
router.put("/:id", authMiddleware, updateHistory);
router.delete("/:id", authMiddleware, deleteHistory);

module.exports = router;
