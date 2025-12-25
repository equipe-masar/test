const TransfereExt = require("../models/TransfereExt.model");
const Personnel = require("../models/Personnel.model");
const Corge = require("../models/Corge.model");

// Get all external transfers
exports.getAllTransfereExts = async (req, res) => {
  try {
    const transfers = await TransfereExt.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Corge, as: "corge" }
      ]
    });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get transfers for one personnel
exports.getTransfereExtByPersonnel = async (req, res) => {
  try {
    const transfers = await TransfereExt.findAll({
      where: { id_personnel: req.params.personnelId },
      include: [{ model: Corge, as: "corge" }]
    });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new external transfer
exports.addTransfereExt = async (req, res) => {
  try {
    const { id_personnel, id_corge, dttranExt, ref_tran_ext } = req.body;
    const entry = await TransfereExt.create({ id_personnel, id_corge, dttranExt, ref_tran_ext });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing transfer
exports.updateTransfereExt = async (req, res) => {
  try {
    const { id_personnel, id_corge, dttranExt, ref_tran_ext } = req.body;
    const entry = await TransfereExt.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    entry.id_personnel = id_personnel;
    entry.id_corge = id_corge;
    entry.dttranExt = dttranExt;
    entry.ref_tran_ext = ref_tran_ext;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a transfer
exports.deleteTransfereExt = async (req, res) => {
  try {
    const entry = await TransfereExt.findByPk(req.params.id);
    if (!entry) return res.sendStatus(404);

    await entry.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
