const { Router } = require("express");
const {
  getAllSanctions,
  getSanctionById,
  createSanction,
  updateSanction,
  deleteSanction,
} = require("../controllers/Sanction.controller");
const authMiddleware = require("../middleware/auth.middleware"); // JWT protected

const SanctionRouter = Router();

// CRUD routes
SanctionRouter.route("/")
  .get(authMiddleware, getAllSanctions)
  .post(authMiddleware, createSanction);

SanctionRouter.route("/:id")
  .get(authMiddleware, getSanctionById)
  .put(authMiddleware, updateSanction)
  .delete(authMiddleware, deleteSanction);

module.exports = SanctionRouter;
