const HistoryUser = require("../models/HistoryUser.model");

// Get all history
exports.getAllHistory = async (req, res) => {
  try {
    const history = await HistoryUser.findAll();
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get history by user ID
exports.getHistoryByUser = async (req, res) => {
  try {
    const history = await HistoryUser.findAll({
      where: { id_user: req.params.userId }
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new history entry
exports.addHistory = async (req, res) => {
  try {
    const { id_user, status, date_debut, date_fin } = req.body;
    const entry = await HistoryUser.create({ id_user, status, date_debut, date_fin });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update history entry
exports.updateHistory = async (req, res) => {
  try {
    const { status, date_debut, date_fin } = req.body;
    const entry = await HistoryUser.findByPk(req.params.id);

    if (!entry) return res.sendStatus(404);

    entry.status = status;
    entry.date_debut = date_debut;
    entry.date_fin = date_fin;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete history entry
exports.deleteHistory = async (req, res) => {
  try {
    const entry = await HistoryUser.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
