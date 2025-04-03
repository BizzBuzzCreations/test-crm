import { Status } from '../models/status.models.js';

// Create a new status
export const createStatus = async (req, res) => {
  try {
    const status = new Status(req.body);
    await status.save();
    res.status(201).json({
      message: 'Status created successfully',
      status: {
        _id: status._id,
        name: status.name,
        createdAt: status.createdAt,
        updatedAt: status.updatedAt
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all statuses
export const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a status by ID
export const getStatusById = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) return res.status(404).json({ error: 'Status not found' });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a status
export const updateStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!status) return res.status(404).json({ error: 'Status not found' });
    res.status(200).json({
      message: 'Status updated successfully',
      status: {
        _id: status._id,
        name: status.name,
        createdAt: status.createdAt,
        updatedAt: status.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a status
export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndDelete(req.params.id);
    if (!status) return res.status(404).json({ error: 'Status not found' });
    res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
