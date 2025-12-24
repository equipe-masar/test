const { Router } = require("express");
const {
  getAllRegion,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/Region.controller");
const authMiddleware = require("../middleware/auth.middleware"); // JWT protected

const regionRouter = Router();

// CRUD routes
regionRouter.route("/")
  .get(authMiddleware, getAllRegion)
  .post(authMiddleware, createRegion);

regionRouter.route("/:id")
  .get(authMiddleware, getRegionById)
  .put(authMiddleware, updateRegion)
  .delete(authMiddleware, deleteRegion);

module.exports = regionRouter;
