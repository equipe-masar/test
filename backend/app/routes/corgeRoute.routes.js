const { Router } = require("express");
const {
  getAllCorge,
  getCorgeById,
  createCorge,
  updateCorge,
  deleteCorge,
} = require("../controllers/Corge.controller");
const authMiddleware = require("../middleware/auth.middleware"); // protect routes

const corgeRouter = Router();

// CRUD routes
corgeRouter.route("/")
  .get(authMiddleware, getAllCorge)
  .post(authMiddleware, createCorge);

corgeRouter.route("/:id")
  .get(authMiddleware, getCorgeById)
  .put(authMiddleware, updateCorge)
  .delete(authMiddleware, deleteCorge);

module.exports = corgeRouter;
