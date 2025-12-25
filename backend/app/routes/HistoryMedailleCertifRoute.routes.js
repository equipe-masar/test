const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistoryMedailleCertifs,
  getHistoryMedailleCertifById,
  createHistoryMedailleCertif,
  updateHistoryMedailleCertif,
  deleteHistoryMedailleCertif
} = require("../controllers/HistoryMedailleCertif.controller");

const historyMedailleCertifRouter = Router();

// CRUD routes
historyMedailleCertifRouter.get("/", authMiddleware, getAllHistoryMedailleCertifs);
historyMedailleCertifRouter.get("/:id", authMiddleware, getHistoryMedailleCertifById);
historyMedailleCertifRouter.post("/", authMiddleware, createHistoryMedailleCertif);
historyMedailleCertifRouter.put("/:id", authMiddleware, updateHistoryMedailleCertif);
historyMedailleCertifRouter.delete("/:id", authMiddleware, deleteHistoryMedailleCertif);

module.exports = historyMedailleCertifRouter;
