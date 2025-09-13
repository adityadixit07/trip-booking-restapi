import express from 'express';
import { listAvailable, getTrip } from '../controllers/tripController.js';

const router = express.Router();

router.get('/', listAvailable); // /api/trips?from=X&to=Y&date=YYYY-MM-DD
router.get('/:id', getTrip);

export default router;
