import { Router, Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { Release } from '../models/release';

const router = Router();

const ReleaseModel = getModelForClass(Release);

router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const { _id: id } = await ReleaseModel.create({ name, price });
  const release = await ReleaseModel.findById(id).exec();

  return res.status(201).send(release);
});

router.get('/', [], async (req: Request, res: Response) => {
  const releases = await ReleaseModel.find({});
  return res.status(200).send(releases);
});

export default router;
