const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel
} = require("../controllers/Personnel.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllPersonnel);
router.get("/:id", authMiddleware, getPersonnelById);
router.post("/", authMiddleware, createPersonnel);
router.put("/:id", authMiddleware, updatePersonnel);
router.delete("/:id", authMiddleware, deletePersonnel);

module.exports = router;
