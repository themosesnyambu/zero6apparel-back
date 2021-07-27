import { Router } from 'express';
import releaseRoutes from './releaseRoutes';

const router = Router();

router.use('/releases', releaseRoutes);

export default router;
