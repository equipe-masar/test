const { Router } = require("express");
const {
  getAllBrigade,
  getBrigadeById,
  createBrigade,
  updateBrigade,
  deleteBrigade,
} = require("../controllers/Brigade.controller");
const authMiddleware = require("../middleware/auth.middleware"); // protect routes

const brigadeRouter = Router();

// CRUD routes
brigadeRouter.route("/")
  .get(authMiddleware, getAllBrigade)       // protected
  .post(authMiddleware, createBrigade);    // protected

brigadeRouter.route("/:id")
  .get(authMiddleware, getBrigadeById)    // protected
  .put(authMiddleware, updateBrigade)     // protected
  .delete(authMiddleware, deleteBrigade); // protected

module.exports = brigadeRouter;
