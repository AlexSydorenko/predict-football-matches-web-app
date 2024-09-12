import express from 'express';
import { getFixtureById, getFixturesByDate } from '../controllers/fixture.controller.js';

const router = express.Router();

router.get('/:id', getFixtureById);
router.get('/date/:date', getFixturesByDate);

export default router;
