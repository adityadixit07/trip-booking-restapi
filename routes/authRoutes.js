import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min length 6')
  ],
  register
);

router.post('/login', login);
router.get('/me', auth, me); // get user details

export default router;
