import { Router } from 'express';
import releaseRoutes from './releaseRoutes';
import usersRoutes from './userRoutes';

const router = Router();

router.use('/releases', releaseRoutes);
router.use('/users', usersRoutes);

export default router;
