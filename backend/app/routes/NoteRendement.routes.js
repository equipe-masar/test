const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getAllNoteRendement, getNoteRendementById, createNoteRendement, updateNoteRendement, deleteNoteRendement } = require("../controllers/NoteRendement.controller");

const noteRendementRouter = Router();

// CRUD routes
noteRendementRouter.get("/", authMiddleware, getAllNoteRendement);
noteRendementRouter.get("/:id", authMiddleware, getNoteRendementById);
noteRendementRouter.post("/", authMiddleware, createNoteRendement);
noteRendementRouter.put("/:id", authMiddleware, updateNoteRendement);
noteRendementRouter.delete("/:id", authMiddleware, deleteNoteRendement);

module.exports = noteRendementRouter;
