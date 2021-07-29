import { Router, Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/user';

const router = Router();

const UserModel = getModelForClass(User);

router.post('/', async (req: Request, res: Response) => {
  const {
    firstName, lastName, email, dateOfBirth, newsletter, password,
  } = req.body;
  await UserModel.create({
    firstName, lastName, email, dateOfBirth, newsletter, password,
  });
  return res.status(201);
});

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
