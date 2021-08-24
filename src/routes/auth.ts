import { Router } from 'express';
import AuthController from '../controllers/authController';

const { userSignup, userLogin, logout } = AuthController;

const router = Router();

router.post('/signup/user', userSignup);
router.post('/signin', userLogin);
router.post('/logout', logout);

export default router;
