const HistoryCarteMil = require("../models/HistoryCarteMil.model");
const Personnel = require("../models/Personnel.model");

// GET ALL
const getAllHistoryCarteMils = async (_, res) => {
  try {
    const data = await HistoryCarteMil.findAll({
      include: [{ model: Personnel }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history carte mil:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryCarteMilById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await HistoryCarteMil.findByPk(id, {
      include: [{ model: Personnel }]
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
const createHistoryCarteMil = async (req, res) => {
  const { id_personnel, num_carte, date_debut, date_fin } = req.body;

  if (!id_personnel || !num_carte || !date_debut) {
    return res.status(400).json({
      success: false,
      message: "id_personnel, num_carte and date_debut are required"
    });
  }

  try {
    const data = await HistoryCarteMil.create({
      id_personnel,
      num_carte,
      date_debut,
      date_fin
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryCarteMil = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, num_carte, date_debut, date_fin } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryCarteMil.update(
      { id_personnel, num_carte, date_debut, date_fin },
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
const deleteHistoryCarteMil = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryCarteMil.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryCarteMils,
  getHistoryCarteMilById,
  createHistoryCarteMil,
  updateHistoryCarteMil,
  deleteHistoryCarteMil
};
