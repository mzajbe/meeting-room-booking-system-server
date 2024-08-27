

import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Route to handle user sign-up
router.post('/signup', UserControllers.signUp);

export const UserRoutes = router;

///api/auth