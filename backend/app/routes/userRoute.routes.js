const { Router } = require("express");
const {
  getAllUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/User.controller");
const { loginUser } = require("../controllers/Login.controller");
const { logoutUser } = require("../controllers/Logout.controller"); // optional if you have logout

const userRouter = Router();

// CRUD routes
userRouter.route("/")
  .get(getAllUser)
  .post(createUser);

userRouter.route("/:username")
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

// Auth routes
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser); // optional

module.exports = userRouter;
