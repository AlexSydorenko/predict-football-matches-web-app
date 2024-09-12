import express from 'express';
import { getUserPredictions, addNewPrediction, updateScore } from '../controllers/prediction.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/user-predictions/:id', protectRoute, getUserPredictions);
router.post('/add-prediction', protectRoute, addNewPrediction);
router.put('/score/:id', protectRoute, updateScore);

export default router;
