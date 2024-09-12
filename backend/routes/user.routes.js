import express from 'express';

import { deleteAccount, getAllUsers, updateUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/all', protectRoute, getAllUsers);
router.put('/update-user', protectRoute, updateUser);
router.delete('/delete-account', protectRoute, deleteAccount);

export default router;
