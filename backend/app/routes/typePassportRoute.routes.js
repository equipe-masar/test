const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllTypePassports,
  getTypePassportById,
  createTypePassport,
  updateTypePassport,
  deleteTypePassport
} = require("../controllers/TypePassport.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllTypePassports);
router.get("/:id", authMiddleware, getTypePassportById);
router.post("/", authMiddleware, createTypePassport);
router.put("/:id", authMiddleware, updateTypePassport);
router.delete("/:id", authMiddleware, deleteTypePassport);

module.exports = router;
