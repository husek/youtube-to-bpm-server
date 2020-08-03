import { Router } from 'express';
import VideoRouter from './Video';

const router = Router();

router.use('/video/', VideoRouter);

export default router;
