const NoteAnnuelle = require("../models/NoteAnnuelle.model");
const Personnel = require("../models/Personnel.model");

// GET ALL
const getAllNoteAnnuelles = async (_, res) => {
  try {
    const data = await NoteAnnuelle.findAll({
      include: [{ model: Personnel }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching note annuelles:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getNoteAnnuelleById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await NoteAnnuelle.findByPk(id, {
      include: [{ model: Personnel }]
    });
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createNoteAnnuelle = async (req, res) => {
  const { id_personnel, note, date, ref } = req.body;

  if (!id_personnel || note === undefined || !date || !ref) {
    return res.status(400).json({
      success: false,
      message: "id_personnel, note, date and ref are required"
    });
  }

  try {
    const data = await NoteAnnuelle.create({ id_personnel, note, date, ref });
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNoteAnnuelle = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, note, date, ref } = req.body;

  try {
    const [updatedCount, updatedRows] = await NoteAnnuelle.update(
      { id_personnel, note, date, ref },
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
const deleteNoteAnnuelle = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await NoteAnnuelle.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNoteAnnuelles,
  getNoteAnnuelleById,
  createNoteAnnuelle,
  updateNoteAnnuelle,
  deleteNoteAnnuelle
};
