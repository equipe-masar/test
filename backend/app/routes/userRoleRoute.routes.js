const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles
} = require("../controllers/UserRole.controller");

const router = Router();

router.post("/assign", authMiddleware, assignRoleToUser);
router.delete("/remove/:id_user/:id_role", authMiddleware, removeRoleFromUser);
router.get("/user/:userId", authMiddleware, getUserRoles);

module.exports = router;
