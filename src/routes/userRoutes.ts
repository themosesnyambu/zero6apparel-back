import { Router, Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/user';
import AuthController from '../controllers/authController';

const { userSignup } = AuthController;
const router = Router();

const UserModel = getModelForClass(User);

router.post('/', userSignup);

router.get('/', [], async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  return res.status(200).send(users);
});

router.get('/:id', [], async (req: Request, res: Response) => {
  const users = await UserModel.findById({ _id: req.params.id }).exec();
  return res.status(200).send(users);
});

router.delete(':/id', async (req: Request, res: Response) => {
  await UserModel.findByIdAndRemove({ _id: req.params.id });
  return res.status(200);
});

router.put('/:id', (req : Request, res : Response) => {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
  return res.status(200);
});

export default router;
