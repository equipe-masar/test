const NoteRendement = require("../models/NoteRendement.model");

// GET ALL
const getAllNoteRendement = async (_, res) => {
  try {
    const notes = await NoteRendement.findAll();
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error fetching note rendement:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getNoteRendementById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteRendement.findByPk(id);
    if (!note) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createNoteRendement = async (req, res) => {
  const { id_personnel, note_rend, date_note_rend, annee_note_rend, semestre_note_rend, ref, valid_note_rend, valid_dgaaf_note_rend } = req.body;
  if (!id_personnel || !note_rend || !date_note_rend || !annee_note_rend || !semestre_note_rend) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const note = await NoteRendement.create({ id_personnel, note_rend, date_note_rend, annee_note_rend, semestre_note_rend, ref, valid_note_rend, valid_dgaaf_note_rend });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNoteRendement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedCount, updatedRows] = await NoteRendement.update(req.body, { where: { id_note_rend: id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteNoteRendement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await NoteRendement.destroy({ where: { id_note_rend: id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNoteRendement,
  getNoteRendementById,
  createNoteRendement,
  updateNoteRendement,
  deleteNoteRendement,
};
