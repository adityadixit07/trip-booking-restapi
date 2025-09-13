import express from 'express';
import auth from '../middlewares/auth.js';
import permit from '../middlewares/role.js';
import { addTrip, listTrips, updateTrip, deleteTrip } from '../controllers/adminController.js';

const router = express.Router();

router.use(auth);
router.use(permit('admin'));

router.post('/trips', addTrip);
router.get('/trips', listTrips);
router.put('/trips/:id', updateTrip);
router.delete('/trips/:id', deleteTrip);

export default router;
