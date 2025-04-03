import express from 'express';
import {
  createUserType,
  getAllUserTypes,
  getUserTypeById,
  updateUserType,
  deleteUserType
} from '../controllers/usertype.controller.js';

const router = express.Router();

router.post('/', createUserType);
router.get('/', getAllUserTypes);
router.get('/:id', getUserTypeById);
router.put('/:id', updateUserType);
router.delete('/:id', deleteUserType);

export default router;
