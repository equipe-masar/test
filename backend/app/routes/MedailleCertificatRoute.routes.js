const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllMedailleCertificats,
  getMedailleCertificatById,
  createMedailleCertificat,
  updateMedailleCertificat,
  deleteMedailleCertificat
} = require("../controllers/MedailleCertificat.controller");

const medailleCertificatRouter = Router();

// CRUD routes
medailleCertificatRouter.get("/", authMiddleware, getAllMedailleCertificats);
medailleCertificatRouter.get("/:id", authMiddleware, getMedailleCertificatById);
medailleCertificatRouter.post("/", authMiddleware, createMedailleCertificat);
medailleCertificatRouter.put("/:id", authMiddleware, updateMedailleCertificat);
medailleCertificatRouter.delete("/:id", authMiddleware, deleteMedailleCertificat);

module.exports = medailleCertificatRouter;
