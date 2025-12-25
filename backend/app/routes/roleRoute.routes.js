const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require("../controllers/Role.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllRoles);
router.get("/:id", authMiddleware, getRoleById);
router.post("/", authMiddleware, createRole);
router.put("/:id", authMiddleware, updateRole);
router.delete("/:id", authMiddleware, deleteRole);

module.exports = router;
