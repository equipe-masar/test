const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission
} = require("../controllers/Permission.controller");

const permissionRouter = Router();

// CRUD routes
permissionRouter.get("/", authMiddleware, getAllPermissions);
permissionRouter.get("/:id", authMiddleware, getPermissionById);
permissionRouter.post("/", authMiddleware, createPermission);
permissionRouter.put("/:id", authMiddleware, updatePermission);
permissionRouter.delete("/:id", authMiddleware, deletePermission);

module.exports = permissionRouter;
