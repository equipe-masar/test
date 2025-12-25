const TransfereInter = require("../models/TransfereInter.model");
const Personnel = require("../models/Personnel.model");
const Departement = require("../models/Departement.model");

// Get all internal transfers
exports.getAllTransfereInters = async (req, res) => {
  try {
    const transfers = await TransfereInter.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Departement, as: "departement" }
      ]
    });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get transfers for one personnel
exports.getTransfereInterByPersonnel = async (req, res) => {
  try {
    const transfers = await TransfereInter.findAll({
      where: { id_personnel: req.params.personnelId },
      include: [{ model: Departement, as: "departement" }]
    });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new internal transfer
exports.addTransfereInter = async (req, res) => {
  try {
    const { id_personnel, id_departement, ref, dttranInter } = req.body;
    const entry = await TransfereInter.create({ id_personnel, id_departement, ref, dttranInter });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing internal transfer
exports.updateTransfereInter = async (req, res) => {
  try {
    const { id_personnel, id_departement, ref, dttranInter } = req.body;
    const entry = await TransfereInter.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    entry.id_personnel = id_personnel;
    entry.id_departement = id_departement;
    entry.ref = ref;
    entry.dttranInter = dttranInter;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an internal transfer
exports.deleteTransfereInter = async (req, res) => {
  try {
    const entry = await TransfereInter.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
