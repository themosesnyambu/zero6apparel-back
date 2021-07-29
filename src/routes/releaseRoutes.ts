import { Router, Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { Release } from '../models/release';

const router = Router();

const ReleaseModel = getModelForClass(Release);

router.post('/', async (req: Request, res: Response) => {
  const {
    name, price, description, color, photos, revies,
  } = req.body;
  await ReleaseModel.create({
    name, price, description, color, photos, revies,
  });
  return res.status(201);
});

router.get('/', [], async (req: Request, res: Response) => {
  const releases = await ReleaseModel.find({});
  return res.status(200).send(releases);
});

router.get('/:id', [], async (req: Request, res: Response) => {
  const release = await ReleaseModel.findById({ _id: req.params.id }).exec();
  return res.status(200).send(release);
});

router.delete(':/id', async (req: Request, res: Response) => {
  await ReleaseModel.findByIdAndRemove({ _id: req.params.id });
  return res.status(200);
});

router.put('/:id', (req : Request, res : Response) => {
  ReleaseModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
  return res.status(200);
});

export default router;
