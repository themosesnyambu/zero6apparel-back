import { Router } from 'express';
import AuthController from '../controllers/authController';

const { userSignup, userLogin } = AuthController;
const router = Router();

router.post('/signup/user', userSignup);
router.post('/signin', userLogin);

export default router;
