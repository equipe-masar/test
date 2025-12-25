const HistoryContrat = require("../models/HistoryContrat.model");
const Personnel = require("../models/Personnel.model");
const Contrat = require("../models/Contrat.model");

// GET ALL
const getAllHistoryContrats = async (_, res) => {
  try {
    const data = await HistoryContrat.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Contrat, as: "contrat" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history contrats:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryContratById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryContrat.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Contrat, as: "contrat" }
      ]
    });
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createHistoryContrat = async (req, res) => {
  const { id_personnel, id_contrat, date_debut, date_fin, ref } = req.body;
  if (!id_personnel || !id_contrat || !date_debut) {
    return res.status(400).json({ success: false, message: "id_personnel, id_contrat and date_debut are required" });
  }

  try {
    const record = await HistoryContrat.create({ id_personnel, id_contrat, date_debut, date_fin, ref });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryContrat = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_contrat, date_debut, date_fin, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryContrat.update(
      { id_personnel, id_contrat, date_debut, date_fin, ref },
      { where: { id }, returning: true }
    );
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteHistoryContrat = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryContrat.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryContrats,
  getHistoryContratById,
  createHistoryContrat,
  updateHistoryContrat,
  deleteHistoryContrat
};
