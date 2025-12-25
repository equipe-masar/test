const HistoryGrade = require("../models/HistoryGrade.model");
const Grade = require("../models/Grade.model");
const Personnel = require("../models/Personnel.model"); // updated model

// Get all history
exports.getAllHistoryGrades = async (req, res) => {
  try {
    const history = await HistoryGrade.findAll({
      include: [
        { model: Grade, as: "grade" },
        { model: Personnel, as: "personnel" }
      ]
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get history for one personnel
exports.getHistoryByPersonnel = async (req, res) => {
  try {
    const history = await HistoryGrade.findAll({
      where: { id_personnel: req.params.personnelId },
      include: [{ model: Grade, as: "grade" }]
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add history entry
exports.addHistoryGrade = async (req, res) => {
  try {
    const { id_grade, id_personnel, dtgrade, ref_grade } = req.body;
    const entry = await HistoryGrade.create({ id_grade, id_personnel, dtgrade, ref_grade });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update history entry
exports.updateHistoryGrade = async (req, res) => {
  try {
    const { id_grade, id_personnel, dtgrade, ref_grade } = req.body;
    const entry = await HistoryGrade.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    entry.id_grade = id_grade;
    entry.id_personnel = id_personnel;
    entry.dtgrade = dtgrade;
    entry.ref_grade = ref_grade;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete history entry
exports.deleteHistoryGrade = async (req, res) => {
  try {
    const entry = await HistoryGrade.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
