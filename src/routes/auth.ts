import { Router } from 'express';
import AuthController from '../controllers/authController';

const { userSignup } = AuthController;
const router = Router();

router.post('/signup/user', userSignup);

export default router;
