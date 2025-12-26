const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllNoteNuits,
  getNoteNuitById,
  createNoteNuit,
  updateNoteNuit,
  deleteNoteNuit
} = require("../controllers/NoteNuit.controller");

const noteNuitRouter = Router();

// CRUD
noteNuitRouter.get("/", authMiddleware, getAllNoteNuits);
noteNuitRouter.get("/:id", authMiddleware, getNoteNuitById);
noteNuitRouter.post("/", authMiddleware, createNoteNuit);
noteNuitRouter.put("/:id", authMiddleware, updateNoteNuit);
noteNuitRouter.delete("/:id", authMiddleware, deleteNoteNuit);

module.exports = noteNuitRouter;
