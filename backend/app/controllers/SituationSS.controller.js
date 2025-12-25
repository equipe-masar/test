const SituationSS = require("../models/SituationSS.model");
const SituationSP = require("../models/SituationSP.model");

// GET ALL
const getAllSituationSS = async (_, res) => {
  try {
    const data = await SituationSS.findAll({
      include: [{ model: SituationSP, as: "situation_sp" }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching situation_ss:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getSituationSSById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await SituationSS.findByPk(id, {
      include: [{ model: SituationSP, as: "situation_sp" }]
    });
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createSituationSS = async (req, res) => {
  const { id_situation_sp, libelle } = req.body;
  if (!id_situation_sp || !libelle) return res.status(400).json({ success: false, message: "id_situation_sp and libelle are required" });

  try {
    const record = await SituationSS.create({ id_situation_sp, libelle });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateSituationSS = async (req, res) => {
  const { id } = req.params;
  const { id_situation_sp, libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await SituationSS.update(
      { id_situation_sp, libelle },
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
const deleteSituationSS = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await SituationSS.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllSituationSS,
  getSituationSSById,
  createSituationSS,
  updateSituationSS,
  deleteSituationSS
};
