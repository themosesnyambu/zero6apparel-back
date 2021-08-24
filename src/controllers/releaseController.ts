import { Request, Response } from 'express';
import ReleaseService from '../services/releaseService';

const {
  createRelease, getReleases, getRelease, deleteRelease, updateRelease,
} = ReleaseService;

export default class ReleaseController {
  static async addNewRelease(req: Request, res: Response) {
    const releaseData = req.body;
    await createRelease(releaseData);
    return res.sendStatus(201);
  }

  static async getReleases(req: Request, res: Response) {
    const releases = await getReleases();
    return res.status(200).send(releases);
  }

  static async getRelease(req: Request, res: Response) {
    const release = await getRelease(req.params.id);
    return res.status(200).send(release);
  }

  static async deleteRelease(req: Request, res: Response) {
    await deleteRelease(req.params.id);
    return res.status(200);
  }

  static async updateRelease(req: Request, res: Response) {
    updateRelease(req.params.id, req.body);
    return res.status(200);
  }
}
