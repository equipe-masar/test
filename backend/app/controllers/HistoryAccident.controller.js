const HistoryAccident = require("../models/HistoryAccident.model");
const Personnel = require("../models/Personnel.model");
const Accident = require("../models/Accident.model");

// GET ALL
const getAllHistoryAccidents = async (_, res) => {
  try {
    const data = await HistoryAccident.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Accident, as: "accident" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history accidents:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryAccidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryAccident.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Accident, as: "accident" }
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
const createHistoryAccident = async (req, res) => {
  const { id_personnel, id_accident, description, dtacc, ref } = req.body;
  if (!id_personnel || !id_accident || !description || !dtacc) {
    return res.status(400).json({ success: false, message: "id_personnel, id_accident, description, dtacc are required" });
  }

  try {
    const record = await HistoryAccident.create({ id_personnel, id_accident, description, dtacc, ref });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryAccident = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_accident, description, dtacc, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryAccident.update(
      { id_personnel, id_accident, description, dtacc, ref },
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
const deleteHistoryAccident = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryAccident.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryAccidents,
  getHistoryAccidentById,
  createHistoryAccident,
  updateHistoryAccident,
  deleteHistoryAccident
};
