const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllGroupes,
  getGroupeById,
  createGroupe,
  updateGroupe,
  deleteGroupe
} = require("../controllers/GroupeSanguin.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllGroupes);
router.get("/:id", authMiddleware, getGroupeById);
router.post("/", authMiddleware, createGroupe);
router.put("/:id", authMiddleware, updateGroupe);
router.delete("/:id", authMiddleware, deleteGroupe);

module.exports = router;
