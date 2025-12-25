const HistoryDiplome = require("../models/HistoryDiplome.model");
const Personnel = require("../models/Personnel.model");
const Diplome = require("../models/Diplome.model");
const Ecole = require("../models/Ecole.model");

// GET ALL
const getAllHistoryDiplomes = async (_, res) => {
  try {
    const data = await HistoryDiplome.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Diplome, as: "diplome" },
        { model: Ecole, as: "ecole" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history diplomes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryDiplomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryDiplome.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Diplome, as: "diplome" },
        { model: Ecole, as: "ecole" }
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
const createHistoryDiplome = async (req, res) => {
  const { id_personnel, id_diplome, id_ecole, date_diplome, ref, remarques } = req.body;
  if (!id_personnel || !id_diplome || !id_ecole || !date_diplome) {
    return res.status(400).json({ success: false, message: "id_personnel, id_diplome, id_ecole and date_diplome are required" });
  }

  try {
    const record = await HistoryDiplome.create({ id_personnel, id_diplome, id_ecole, date_diplome, ref, remarques });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryDiplome = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_diplome, id_ecole, date_diplome, ref, remarques } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryDiplome.update(
      { id_personnel, id_diplome, id_ecole, date_diplome, ref, remarques },
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
const deleteHistoryDiplome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryDiplome.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryDiplomes,
  getHistoryDiplomeById,
  createHistoryDiplome,
  updateHistoryDiplome,
  deleteHistoryDiplome
};
