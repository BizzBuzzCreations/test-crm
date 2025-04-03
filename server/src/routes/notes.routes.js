import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  appendNote // Add the new append note route
} from '../controllers/notes.controller.js';

const router = express.Router();

// Create a new note for a specific lead and user
router.post('/', createNote);

// Get all notes for all leads and users
router.get('/', getAllNotes);

// Get a note by its ID
router.get('/:id', getNoteById);

// Update a note by its ID
router.put('/:id', updateNote);

// Delete a note by its ID
router.delete('/:id', deleteNote);

// Append a note to an existing user's notes for a specific lead
router.post('/append', appendNote); // New route for appending a note

export default router;
