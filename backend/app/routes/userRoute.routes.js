const { Router } = require("express");
const {
  getAllUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/User.controller");
const { loginUser, getMe } = require("../controllers/Login.controller");
const { logoutUser } = require("../controllers/Logout.controller"); // optional if you have logout
const authMiddleware = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/role.middleware");

const userRouter = Router();

// Auth routes (must be declared BEFORE '/:username')
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/me").get(authMiddleware, getMe);

// CRUD routes (protégées, réservées à l'administrateur)
userRouter.route("/")
  .get(authMiddleware, requireAdmin, getAllUser)
  .post(authMiddleware, requireAdmin, createUser);

userRouter.route("/:username")
  .get(authMiddleware, requireAdmin, getUserByUsername)
  .put(authMiddleware, requireAdmin, updateUser)
  .delete(authMiddleware, requireAdmin, deleteUser);

module.exports = userRouter;
