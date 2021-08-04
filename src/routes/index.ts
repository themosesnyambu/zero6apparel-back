import { Router } from 'express';
import releaseRoutes from './releaseRoutes';
import usersRoutes from './userRoutes';
import auth from './auth';

const router = Router();

router.use('/releases', releaseRoutes);
router.use('/users', usersRoutes);
router.use('/auth', auth);

export default router;
