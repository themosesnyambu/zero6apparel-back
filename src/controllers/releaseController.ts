import { Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { Release } from '../models/release';

const ReleaseModel = getModelForClass(Release);

export default class ReleaseController {
  static async addNewRelease(req: Request, res: Response) {
    const {
      name, price, description, color, photos, reviews,
    } = req.body;
    await ReleaseModel.create({
      name,
      price,
      description,
      color,
      photos,
      reviews,
    });
    return res.sendStatus(201);
  }

  static async getReleases(req: Request, res: Response) {
    const releases = await ReleaseModel.find({});
    return res.status(200).send(releases);
  }

  static async getRelease(req: Request, res: Response) {
    const release = await ReleaseModel.findById({ _id: req.params.id }).exec();
    return res.status(200).send(release);
  }

  static async deleteRelease(req: Request, res: Response) {
    await ReleaseModel.findByIdAndRemove({ _id: req.params.id });
    return res.status(200);
  }

  static async updateRelease(req: Request, res: Response) {
    ReleaseModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    return res.status(200);
  }
}
