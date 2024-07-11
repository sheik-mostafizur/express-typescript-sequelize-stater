import { Router } from 'express';
import { getUser } from '@/api/v0/controllers/user.controller';

const router = Router();

router.get('/user', getUser);

export default router;
