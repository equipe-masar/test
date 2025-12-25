const HistorySituation = require("../models/HistorySituation.model");
const Personnel = require("../models/Personnel.model");
const SituationSS = require("../models/SituationSS.model");

// GET ALL
const getAllHistorySituations = async (_, res) => {
  try {
    const data = await HistorySituation.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: SituationSS, as: "situationSS" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history situations:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistorySituationById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistorySituation.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: SituationSS, as: "situationSS" }
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
const createHistorySituation = async (req, res) => {
  const { id_personnel, id_situationSS, dtsit, ref } = req.body;
  if (!id_personnel || !id_situationSS || !dtsit) {
    return res.status(400).json({ success: false, message: "id_personnel, id_situationSS and dtsit are required" });
  }

  try {
    const record = await HistorySituation.create({ id_personnel, id_situationSS, dtsit, ref });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistorySituation = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_situationSS, dtsit, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistorySituation.update(
      { id_personnel, id_situationSS, dtsit, ref },
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
const deleteHistorySituation = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistorySituation.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistorySituations,
  getHistorySituationById,
  createHistorySituation,
  updateHistorySituation,
  deleteHistorySituation
};
