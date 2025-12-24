const { Router } = require("express");
const {
  getAllGarnizon,
  getGarnizonById,
  createGarnizon,
  updateGarnizon,
  deleteGarnizon,
} = require("../controllers/Garnizon.controller");
const authMiddleware = require("../middleware/auth.middleware"); // JWT protected

const garnizonRouter = Router();

// CRUD routes
garnizonRouter.route("/")
  .get(authMiddleware, getAllGarnizon)
  .post(authMiddleware, createGarnizon);

garnizonRouter.route("/:id")
  .get(authMiddleware, getGarnizonById)
  .put(authMiddleware, updateGarnizon)
  .delete(authMiddleware, deleteGarnizon);

module.exports = garnizonRouter;
