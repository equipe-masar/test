const Interruption = require("../models/Interruption.model");

// Get all interruptions
exports.getAllInterruptions = async (req, res) => {
  try {
    const interruptions = await Interruption.findAll();
    res.json(interruptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one interruption by ID
exports.getInterruptionById = async (req, res) => {
  try {
    const interruption = await Interruption.findByPk(req.params.id);
    if (!interruption) return res.sendStatus(404);
    res.json(interruption);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new interruption
exports.addInterruption = async (req, res) => {
  try {
    const { libelle } = req.body;
    const entry = await Interruption.create({ libelle });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an interruption
exports.updateInterruption = async (req, res) => {
  try {
    const { libelle } = req.body;
    const entry = await Interruption.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    entry.libelle = libelle;
    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an interruption
exports.deleteInterruption = async (req, res) => {
  try {
    const entry = await Interruption.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
