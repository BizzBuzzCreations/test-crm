import express from 'express';
import { upload } from '../utils/multer.js';
import { uploadDocument, getAllDocuments, deleteDocument } from '../controllers/documents.controller.js';

const router = express.Router();

router.post('/', upload.single('file'), uploadDocument);
router.get('/', getAllDocuments);
router.delete('/:id', deleteDocument);

export default router;
