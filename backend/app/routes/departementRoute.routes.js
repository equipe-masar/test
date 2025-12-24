const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllDepartements,
  getDepartementById,
  createDepartement,
  updateDepartement,
  deleteDepartement
} = require("../controllers/Departement.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllDepartements);
router.get("/:id", authMiddleware, getDepartementById);
router.post("/", authMiddleware, createDepartement);
router.put("/:id", authMiddleware, updateDepartement);
router.delete("/:id", authMiddleware, deleteDepartement);

module.exports = router;
