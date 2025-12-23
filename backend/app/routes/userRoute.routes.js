const { Router } = require("express");
const {
  getAllUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/User.controller");
const { loginUser } = require("../controllers/Login.controller"); // Fix the import statement

const userRouter = Router();

userRouter.route("/").get(getAllUser).post(createUser);
userRouter.route('/login').post(loginUser);

userRouter
  .route("/:username")
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
