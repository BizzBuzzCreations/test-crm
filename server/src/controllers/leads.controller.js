import { Lead } from '../models/leads.models.js';

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({
      message: 'Lead created successfully',
      lead: { 
        _id: lead._id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phoneNumber: lead.phoneNumber,
        email: lead.email,
        doorNo: lead.doorNo,
        postcode: lead.postcode,
        description: lead.description,
        isActve: lead.isActive,
        userId: lead.userId,
        statusId: lead.statusId,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
        __v: lead.__v
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate('userId', 'name username')
      .populate('statusId', 'name');
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('userId', 'name username')
      .populate('statusId', 'name');
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('userId', 'name username')
      .populate('statusId', 'name');
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({
      message: 'Lead updated successfully',
      lead: { 
        _id: lead._id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phoneNumber: lead.phoneNumber,
        email: lead.email,
        doorNo: lead.doorNo,
        postcode: lead.postcode,
        description: lead.description,
        isActve: lead.isActive,
        userId: lead.userId,
        statusId: lead.statusId,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
        __v: lead.__v
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Transfer lead to another agent
export const transferLead = async (req, res) => {
  try {
    const { newUserId } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { userId: newUserId },
      { new: true }
    ).populate('userId', 'name username');
    
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    res.status(200).json({ message: 'Lead transferred successfully', lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
