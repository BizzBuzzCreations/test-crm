import mongoose from 'mongoose';

const userTypeSchema = new mongoose.Schema(
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

export const UserType = mongoose.model('UserType', userTypeSchema);
