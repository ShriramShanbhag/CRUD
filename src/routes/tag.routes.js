import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requirePermission } from '../middlewares/authorize';
import { addTagToChat, createTag, deleteTag, detachTagFromChat, updateTag } from '../controllers/tag.controller';

const router = express.Router();

router.post('/', requireAuth, requirePermission, createTag);
router.put('/:id', requireAuth, requirePermission, updateTag);
router.delete('/:id', requireAuth, requirePermission, deleteTag);
router.post('/:id/tags', requireAuth, requirePermission, addTagToChat);
router.delete('/:id/tags/:tagId', requireAuth, requirePermission, detachTagFromChat)

export default router