const HistorySanction = require("../models/HistorySanction.model");
const Personnel = require("../models/Personnel.model");
const Sanction = require("../models/Sanction.model");

// GET ALL
const getAllHistorySanctions = async (_, res) => {
  try {
    const data = await HistorySanction.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Sanction, as: "sanction" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history sanctions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistorySanctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistorySanction.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Sanction, as: "sanction" }
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
const createHistorySanction = async (req, res) => {
  const { id_personnel, id_sanction, date_sanction, taux, cause, ref } = req.body;

  if (!id_personnel || !id_sanction || !date_sanction) {
    return res.status(400).json({
      success: false,
      message: "id_personnel, id_sanction and date_sanction are required"
    });
  }

  try {
    const record = await HistorySanction.create({
      id_personnel,
      id_sanction,
      date_sanction,
      taux,
      cause,
      ref
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistorySanction = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_sanction, date_sanction, taux, cause, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistorySanction.update(
      { id_personnel, id_sanction, date_sanction, taux, cause, ref },
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
const deleteHistorySanction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistorySanction.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistorySanctions,
  getHistorySanctionById,
  createHistorySanction,
  updateHistorySanction,
  deleteHistorySanction
};
