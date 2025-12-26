const HistoryCarteMilitaire = require("../models/HistoryCarteMilitaire.model");

// GET ALL
const getAllHistoryCarteMilitaire = async (_, res) => {
  try {
    const cartes = await HistoryCarteMilitaire.findAll();
    res.status(200).json({ success: true, data: cartes });
  } catch (error) {
    console.error("Error fetching history cartes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryCarteMilitaireById = async (req, res) => {
  const { id } = req.params;
  try {
    const carte = await HistoryCarteMilitaire.findByPk(id);
    if (!carte) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: carte });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createHistoryCarteMilitaire = async (req, res) => {
  const { id_personnel, num_carte, date_debut, date_fin } = req.body;
  if (!id_personnel || !num_carte || !date_debut || !date_fin)
    return res.status(400).json({ success: false, message: "All required fields must be provided" });

  try {
    const carte = await HistoryCarteMilitaire.create({ id_personnel, num_carte, date_debut, date_fin });
    res.status(201).json({ success: true, data: carte });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryCarteMilitaire = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedCount, updatedRows] = await HistoryCarteMilitaire.update(req.body, {
      where: { id_historyCarte: id },
      returning: true
    });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteHistoryCarteMilitaire = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await HistoryCarteMilitaire.destroy({ where: { id_historyCarte: id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryCarteMilitaire,
  getHistoryCarteMilitaireById,
  createHistoryCarteMilitaire,
  updateHistoryCarteMilitaire,
  deleteHistoryCarteMilitaire
};
