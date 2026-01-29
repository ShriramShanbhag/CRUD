import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requirePermission } from '../middlewares/authorize.js';
import { createTag, deleteTag, updateTag } from '../controllers/tag.controller.js';
import { PERMISSIONS } from '../config/permissions.js';
import { validate } from '../middlewares/validate.js';
import { createTagSchema } from '../validations/tag.schema.js';

const router = express.Router();

router.post('', requireAuth, requirePermission(PERMISSIONS.TAG_CREATE), validate(createTagSchema), createTag);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.TAG_UPDATE), updateTag);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.TAG_DELETE), deleteTag);

export default router