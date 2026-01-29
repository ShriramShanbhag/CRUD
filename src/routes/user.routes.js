import express from "express";
import { 
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMe
 } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requirePermission } from "../middlewares/authorize.js";
import { PERMISSIONS } from "../config/permissions.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/user.schema.js";

const router = express.Router();

router.post('', requireAuth, requirePermission(PERMISSIONS.USER_CREATE), validate(createUserSchema), createUser);
router.get('', requireAuth, requirePermission(PERMISSIONS.USER_READALL), getAllUsers);
router.get('/me', requireAuth, requirePermission(PERMISSIONS.USER_READ), getMe);
router.get('/:id', requireAuth, requirePermission(PERMISSIONS.USER_READ), getUserById);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.USER_UPDATE), validate(updateUserSchema), updateUser);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.USER_DELETE), deleteUser);


export default router;