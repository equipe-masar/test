const NoteAnnuelle = require("../models/NoteAnnuelle.model");

// GET ALL
const getAllNoteAnnuelle = async (_, res) => {
  try {
    const notes = await NoteAnnuelle.findAll();
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error fetching note annuelle:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getNoteAnnuelleById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteAnnuelle.findByPk(id);
    if (!note) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createNoteAnnuelle = async (req, res) => {
  const { id_personnel, note_annuelle, annee, date_note_annuelle, ref } = req.body;
  if (!id_personnel || !note_annuelle || !annee || !date_note_annuelle)
    return res.status(400).json({ success: false, message: "Missing required fields" });

  try {
    const note = await NoteAnnuelle.create({ id_personnel, note_annuelle, annee, date_note_annuelle, ref });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNoteAnnuelle = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedCount, updatedRows] = await NoteAnnuelle.update(req.body, { where: { id_annuelle: id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
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
    const deleted = await NoteAnnuelle.destroy({ where: { id_annuelle: id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNoteAnnuelle,
  getNoteAnnuelleById,
  createNoteAnnuelle,
  updateNoteAnnuelle,
  deleteNoteAnnuelle,
};
