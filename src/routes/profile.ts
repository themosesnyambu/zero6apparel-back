import { Router } from 'express';
import UserController from '../controllers/userController';

import AuthMiddleware from '../middlewares/authMiddleware';

const { userProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;

const router = Router();

router.get('/profiles/:id', isAuthenticated, userProfile);

export default router;
