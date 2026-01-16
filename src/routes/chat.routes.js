import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requirePermission } from '../middlewares/authorize.js';
import { createChat, deleteChat, getChatById, getMyChats } from '../controllers/chat.controller.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = express.Router();

router.post('', requireAuth, requirePermission(PERMISSIONS.CHAT_CREATE), createChat);
router.get('/:id', requireAuth, requirePermission(PERMISSIONS.CHAT_READ), getChatById);
router.get('', requireAuth, requirePermission(PERMISSIONS.CHAT_READALL), getMyChats);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.CHAT_DELETE), deleteChat);

export default router;