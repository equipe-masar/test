const HistoryFunction = require("../models/HistoryFunction.model");
const Personnel = require("../models/Personnel.model");
const Fonction = require("../models/Fonction.model");

// GET ALL
const getAllHistoryFunctions = async (_, res) => {
  try {
    const data = await HistoryFunction.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Fonction, as: "fonction" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history functions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryFunctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryFunction.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Fonction, as: "fonction" }
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
const createHistoryFunction = async (req, res) => {
  const { id_personnel, id_fonction, date_debut, date_fin, ref } = req.body;
  if (!id_personnel || !id_fonction || !date_debut) {
    return res.status(400).json({ success: false, message: "id_personnel, id_fonction and date_debut are required" });
  }

  try {
    const record = await HistoryFunction.create({ id_personnel, id_fonction, date_debut, date_fin, ref });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryFunction = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_fonction, date_debut, date_fin, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryFunction.update(
      { id_personnel, id_fonction, date_debut, date_fin, ref },
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
const deleteHistoryFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryFunction.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryFunctions,
  getHistoryFunctionById,
  createHistoryFunction,
  updateHistoryFunction,
  deleteHistoryFunction
};
