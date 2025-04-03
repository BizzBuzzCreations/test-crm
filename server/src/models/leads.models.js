import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\+?[0-9\s\-()]{7,20}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    doorNo: {
      type: String,
    },
    postcode: {
      type: String,
    },
    description: {
      type: String,
    },
    isActive: {
      type: String,
      enum: ['active', 'dead'],
      default: 'active',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    transferUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
