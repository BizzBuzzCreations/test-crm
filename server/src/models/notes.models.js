import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
  {
    notes: [
      {
        noteText: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    }
  },
  { timestamps: true }
);

export const Note = mongoose.model('Note', notesSchema);
