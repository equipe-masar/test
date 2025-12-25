const HistoryMedailleCertif = require("../models/HistoryMedailleCertif.model");
const Personnel = require("../models/Personnel.model");
const MedailleCertificat = require("../models/MedailleCertificat.model");

// GET ALL
const getAllHistoryMedailleCertifs = async (_, res) => {
  try {
    const data = await HistoryMedailleCertif.findAll({
      include: [
        { model: Personnel },
        { model: MedailleCertificat }
      ]
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history medaille certifs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryMedailleCertifById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await HistoryMedailleCertif.findByPk(id, {
      include: [
        { model: Personnel },
        { model: MedailleCertificat }
      ]
    });

    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createHistoryMedailleCertif = async (req, res) => {
  const { id_personnel, id_medaillecertif, dtmedailCertif, ref } = req.body;

  if (!id_personnel || !id_medaillecertif || !dtmedailCertif || !ref) {
    return res.status(400).json({
      success: false,
      message: "id_personnel, id_medaillecertif, dtmedailCertif and ref are required"
    });
  }

  try {
    const data = await HistoryMedailleCertif.create({
      id_personnel,
      id_medaillecertif,
      dtmedailCertif,
      ref
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryMedailleCertif = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_medaillecertif, dtmedailCertif, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryMedailleCertif.update(
      { id_personnel, id_medaillecertif, dtmedailCertif, ref },
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
const deleteHistoryMedailleCertif = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryMedailleCertif.destroy({ where: { id } });

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryMedailleCertifs,
  getHistoryMedailleCertifById,
  createHistoryMedailleCertif,
  updateHistoryMedailleCertif,
  deleteHistoryMedailleCertif
};
