const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllPassports,
  getPassportById,
  createPassport,
  updatePassport,
  deletePassport
} = require("../controllers/Passport.controller");

const passportRouter = Router();

// CRUD routes
passportRouter.get("/", authMiddleware, getAllPassports);
passportRouter.get("/:id", authMiddleware, getPassportById);
passportRouter.post("/", authMiddleware, createPassport);
passportRouter.put("/:id", authMiddleware, updatePassport);
passportRouter.delete("/:id", authMiddleware, deletePassport);

module.exports = passportRouter;
