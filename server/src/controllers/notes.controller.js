import { Note } from '../models/notes.models.js';
import mongoose from 'mongoose';

// Create a new note
export const createNote = async (req, res) => {
  const { noteText, leadId, userId } = req.body;

  if (!noteText || !leadId || !userId) {
    return res.status(400).json({ error: 'Note text, leadId, and userId are required.' });
  }

  try {
    // Create a new note entry
    const note = new Note({
      userId: new mongoose.Types.ObjectId(userId),
      leadId: new mongoose.Types.ObjectId(leadId),
      notes: [{ noteText, createdAt: new Date() }]
    });

    await note.save();

    res.status(201).json({
      message: "Note created successfully",
      note: {
        _id: note._id,
        notes: note.notes,
        userId: note.userId,
        leadId: note.leadId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        __v: note.__v
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('userId', 'name username').populate('leadId', 'name');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('userId', 'name username').populate('leadId', 'name');
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Append a new note to an existing user's notes for a specific lead
export const appendNote = async (req, res) => {
  const { noteText, leadId, userId } = req.body;

  if (!noteText || !leadId || !userId) {
    return res.status(400).json({ error: 'Note text, leadId, and userId are required.' });
  }

  try {
    // Find the note document for the given leadId and userId
    const noteDoc = await Note.findOne({ leadId, userId });

    if (!noteDoc) {
      // If no note document exists, create a new one
      noteDoc = new Note({
        leadId,
        userId,
        notes: [{ noteText }],
      });
      // return res.status(404).json({ error: 'No notes found for this user and lead' });
    } else {
      // Append the new note to the existing notes array
      noteDoc.notes.push({ noteText });
    }

    // Save the updated note document
    await noteDoc.save();

    res.status(200).json({
      message: 'Note appended successfully',
      note: noteDoc
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({
      message: "Note updated successfully",
      note: {
        _id: note._id,
        notes: note.notes,
        userId: note.userId,
        leadId: note.leadId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        __v: note.__v
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
