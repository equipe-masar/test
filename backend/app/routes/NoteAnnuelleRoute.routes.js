const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getAllNoteAnnuelle, getNoteAnnuelleById, createNoteAnnuelle, updateNoteAnnuelle, deleteNoteAnnuelle } = require("../controllers/NoteAnnuelle.controller");

const noteAnnuelleRouter = Router();

// CRUD routes
noteAnnuelleRouter.get("/", authMiddleware, getAllNoteAnnuelle);
noteAnnuelleRouter.get("/:id", authMiddleware, getNoteAnnuelleById);
noteAnnuelleRouter.post("/", authMiddleware, createNoteAnnuelle);
noteAnnuelleRouter.put("/:id", authMiddleware, updateNoteAnnuelle);
noteAnnuelleRouter.delete("/:id", authMiddleware, deleteNoteAnnuelle);

module.exports = noteAnnuelleRouter;
