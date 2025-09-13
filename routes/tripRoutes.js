import express from 'express';
import { listAvailable, getTrip } from '../controllers/tripController.js';

const router = express.Router();

router.get('/', listAvailable);
router.get('/:id', getTrip); 

export default router;
