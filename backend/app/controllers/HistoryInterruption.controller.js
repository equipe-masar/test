const HistoryInterruption = require("../models/HistoryInterruption.model");
const Personnel = require("../models/Personnel.model");
const Interruption = require("../models/Interruption.model");

// Get all history interruptions
exports.getAllHistoryInterruptions = async (req, res) => {
  try {
    const history = await HistoryInterruption.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Interruption, as: "interruption" }
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
    const history = await HistoryInterruption.findAll({
      where: { id_personnel: req.params.personnelId },
      include: [{ model: Interruption, as: "interruption" }]
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new history entry
exports.addHistoryInterruption = async (req, res) => {
  try {
    const { id_personnel, id_interruption, date_debut, date_fin, ref } = req.body;
    const entry = await HistoryInterruption.create({ id_personnel, id_interruption, date_debut, date_fin, ref });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a history entry
exports.updateHistoryInterruption = async (req, res) => {
  try {
    const { id_personnel, id_interruption, date_debut, date_fin, ref } = req.body;
    const entry = await HistoryInterruption.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    entry.id_personnel = id_personnel;
    entry.id_interruption = id_interruption;
    entry.date_debut = date_debut;
    entry.date_fin = date_fin;
    entry.ref = ref;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a history entry
exports.deleteHistoryInterruption = async (req, res) => {
  try {
    const entry = await HistoryInterruption.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
