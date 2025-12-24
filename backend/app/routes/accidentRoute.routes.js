const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllAccidents,
  getAccidentById,
  createAccident,
  updateAccident,
  deleteAccident
} = require("../controllers/Accident.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllAccidents);
router.get("/:id", authMiddleware, getAccidentById);
router.post("/", authMiddleware, createAccident);
router.put("/:id", authMiddleware, updateAccident);
router.delete("/:id", authMiddleware, deleteAccident);

module.exports = router;
