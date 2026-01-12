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

const router = express.Router();

router.post('', createUser);
router.get('', requireAuth, getAllUsers);
router.get('/me', requireAuth, getMe);
router.get('/:id', requireAuth, getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;