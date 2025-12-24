const { Router } = require("express");
const {
  getAllArmee,
  getArmeeById,
  createArmee,
  updateArmee,
  deleteArmee,
} = require("../controllers/Armee.controller");
const authMiddleware = require("../middleware/auth.middleware"); // protect routes

const armeeRouter = Router();

// CRUD routes
armeeRouter.route("/")
  .get(authMiddleware, getAllArmee)
  .post(authMiddleware, createArmee);

armeeRouter.route("/:id")
  .get(authMiddleware, getArmeeById)
  .put(authMiddleware, updateArmee)
  .delete(authMiddleware, deleteArmee);

module.exports = armeeRouter;
