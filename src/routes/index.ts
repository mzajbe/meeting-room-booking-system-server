// routes.ts
import express from 'express';
import { signUp } from '../modules/user/user.controller';


const router = express.Router();

router.post('/api/auth/signup', signUp);

export default router;
