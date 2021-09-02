import { Router } from 'express';
import releaseRoutes from './releaseRoutes';
import usersRoutes from './userRoutes';
import auth from './auth';
import profileRoutes from './profile';

const router = Router();

router.use('/releases', releaseRoutes);
router.use('/users', usersRoutes);
router.use('/auth', auth);
router.use('/profiles', profileRoutes);

export default router;
