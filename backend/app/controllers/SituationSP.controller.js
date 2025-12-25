const SituationSP = require("../models/SituationSP.model");

// GET ALL
const getAllSituationSPs = async (_, res) => {
  try {
    const data = await SituationSP.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching situation_sps:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getSituationSPById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await SituationSP.findByPk(id);
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createSituationSP = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "libelle is required" });

  try {
    const record = await SituationSP.create({ libelle });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateSituationSP = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await SituationSP.update(
      { libelle },
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
const deleteSituationSP = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await SituationSP.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllSituationSPs,
  getSituationSPById,
  createSituationSP,
  updateSituationSP,
  deleteSituationSP
};
