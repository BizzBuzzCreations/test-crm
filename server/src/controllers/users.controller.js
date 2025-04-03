import bcrypt from 'bcryptjs';
import { User } from '../models/users.models.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, username, password, campaignId, teamId, userTypeId } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      campaignId,
      teamId,
      userTypeId,
    });

    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        campaignId: user.campaignId,
        teamId: user.teamId,
        userTypeId: user.userTypeId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('campaignId', 'name')
      .populate('teamId', 'name')
      .populate('userTypeId', 'name');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('campaignId', 'name')
      .populate('teamId', 'name')
      .populate('userTypeId', 'name');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is provided, hash it before updating
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('campaignId', 'name')
      .populate('teamId', 'name')
      .populate('userTypeId', 'name');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        campaignId: user.campaignId,
        teamId: user.teamId,
        userTypeId: user.userTypeId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login (Authentication)
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
