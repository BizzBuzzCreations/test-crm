import { useState, useEffect, useCallback } from 'react';

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch notes by leadId
  const fetchNotesByLeadId = useCallback(async (leadId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes?leadId=${leadId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes by leadId');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching notes by leadId:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new note
  const createNote = async (noteData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]);
      return newNote;
    } catch (error) {
      setError(error.message);
      console.error('Error creating note:', error);
      throw error;
    }
  };

  // Append a note to existing notes
  const appendNote = async (leadId, userId, noteText) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes/append`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId, userId, noteText }),
      });

      if (!response.ok) {
        throw new Error('Failed to append note');
      }

      const updatedNote = await response.json();
      
      // Update the local state with the new or updated note
      setNotes(prevNotes => {
        const existingNoteIndex = prevNotes.findIndex(
          note => note.leadId === leadId && note.userId === userId
        );

        if (existingNoteIndex !== -1) {
          // Update existing note
          const updatedNotes = [...prevNotes];
          updatedNotes[existingNoteIndex] = updatedNote;
          return updatedNotes;
        } else {
          // Add new note
          return [...prevNotes, updatedNote];
        }
      });

      return updatedNote;
    } catch (error) {
      setError(error.message);
      console.error('Error appending note:', error);
      throw error;
    }
  };

  // Update a note
  const updateNote = async (noteId, updateData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const updatedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note => (note._id === noteId ? updatedNote : note))
      );
      return updatedNote;
    } catch (error) {
      setError(error.message);
      console.error('Error updating note:', error);
      throw error;
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    fetchNotesByLeadId,
    createNote,
    appendNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
