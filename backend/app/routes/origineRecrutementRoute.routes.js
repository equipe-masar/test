const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllOrigineRecrutement,
  getOrigineRecrutementById,
  createOrigineRecrutement,
  updateOrigineRecrutement,
  deleteOrigineRecrutement
} = require("../controllers/OrigineRecrutement.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllOrigineRecrutement);
router.get("/:id", authMiddleware, getOrigineRecrutementById);
router.post("/", authMiddleware, createOrigineRecrutement);
router.put("/:id", authMiddleware, updateOrigineRecrutement);
router.delete("/:id", authMiddleware, deleteOrigineRecrutement);

module.exports = router;
