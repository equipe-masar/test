const MedailleCertificat = require("../models/MedailleCertificat.model");

// GET ALL
const getAllMedailleCertificats = async (_, res) => {
  try {
    const data = await MedailleCertificat.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching medaille certificats:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getMedailleCertificatById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await MedailleCertificat.findByPk(id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createMedailleCertificat = async (req, res) => {
  const { libelle, type, aut, cat } = req.body;

  if (!libelle || !type || !aut || !cat) {
    return res.status(400).json({
      success: false,
      message: "libelle, type, aut and cat are required"
    });
  }

  try {
    const item = await MedailleCertificat.create({
      libelle,
      type,
      aut,
      cat
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateMedailleCertificat = async (req, res) => {
  const { id } = req.params;
  const { libelle, type, aut, cat } = req.body;

  try {
    const [updatedCount, updatedRows] = await MedailleCertificat.update(
      { libelle, type, aut, cat },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteMedailleCertificat = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await MedailleCertificat.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMedailleCertificats,
  getMedailleCertificatById,
  createMedailleCertificat,
  updateMedailleCertificat,
  deleteMedailleCertificat
};
