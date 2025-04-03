import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Status = mongoose.model('Status', statusSchema);
