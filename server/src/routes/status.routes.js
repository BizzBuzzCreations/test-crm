import express from 'express';
import {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus
} from '../controllers/status.controller.js';

const router = express.Router();

router.post('/', createStatus);
router.get('/', getAllStatuses);
router.get('/:id', getStatusById);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

export default router;
