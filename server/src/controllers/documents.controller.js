import { Document } from '../models/documents.models.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Upload a document
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) return res.status(500).json({ error: 'File upload failed' });

        const newDocument = new Document({
            file: [cloudinaryResponse.secure_url],
            userId: req.body.userId,
        });

        await newDocument.save();
        res.status(201).json({ message: 'File uploaded successfully', document: newDocument });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all documents
export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find().populate('userId', 'name');
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a document
export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ error: 'Document not found' });

        const deleteSuccess = await deleteFromCloudinary(document.file[0]);
        if (!deleteSuccess) return res.status(500).json({ error: 'Cloudinary deletion failed' });

        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
