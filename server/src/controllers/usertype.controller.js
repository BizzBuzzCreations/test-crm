import { UserType } from '../models/usertype.models.js';

// Create a new user type
export const createUserType = async (req, res) => {
  try {
    const userType = new UserType(req.body);
    await userType.save();
    res.status(201).json({
      message: 'User Type created successfully',
      userType: {
        _id: userType._id,
        name: userType.name,
        createdAt: userType.createdAt,
        updatedAt: userType.updatedAt
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all user types
export const getAllUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.find();
    res.status(200).json(userTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user type by ID
export const getUserTypeById = async (req, res) => {
  try {
    const userType = await UserType.findById(req.params.id);
    if (!userType) return res.status(404).json({ error: 'User Type not found' });
    res.status(200).json(userType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user type
export const updateUserType = async (req, res) => {
  try {
    const userType = await UserType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userType) return res.status(404).json({ error: 'User Type not found' });
    res.status(200).json({
      message: 'User Type updated successfully',
      userType: {
        _id: userType._id,
        name: userType.name,
        createdAt: userType.createdAt,
        updatedAt: userType.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user type
export const deleteUserType = async (req, res) => {
  try {
    const userType = await UserType.findByIdAndDelete(req.params.id);
    if (!userType) return res.status(404).json({ error: 'User Type not found' });
    res.status(200).json({ message: 'User Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
