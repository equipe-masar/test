const HistoryConge = require("../models/HistoryConge.model");
const Personnel = require("../models/Personnel.model");
const Conge = require("../models/Conge.model");
const Pays = require("../models/Pays.model");

// GET ALL
const getAllHistoryConges = async (_, res) => {
  try {
    const data = await HistoryConge.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Conge, as: "conge" },
        { model: Pays, as: "pays" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history conges:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryCongeById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryConge.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Conge, as: "conge" },
        { model: Pays, as: "pays" }
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
const createHistoryConge = async (req, res) => {
  const { id_personnel, id_conge, id_pays, date_debut, date_fin, adresse } = req.body;
  if (!id_personnel || !id_conge || !date_debut) {
    return res.status(400).json({ success: false, message: "id_personnel, id_conge and date_debut are required" });
  }

  try {
    const record = await HistoryConge.create({ id_personnel, id_conge, id_pays, date_debut, date_fin, adresse });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryConge = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_conge, id_pays, date_debut, date_fin, adresse } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryConge.update(
      { id_personnel, id_conge, id_pays, date_debut, date_fin, adresse },
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
const deleteHistoryConge = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryConge.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryConges,
  getHistoryCongeById,
  createHistoryConge,
  updateHistoryConge,
  deleteHistoryConge
};
