import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requirePermission } from '../middlewares/authorize.js';
import { createChat, deleteChat, getChatById, getMyChats } from '../controllers/chat.conroller.js';

const router = express.Router();

router.post('', requireAuth, requirePermission, createChat);
router.get('/:id', requireAuth, requirePermission, getChatById);
router.get('', requireAuth, requirePermission, getMyChats);
router.delete('', requireAuth, requirePermission, deleteChat);

export default router;