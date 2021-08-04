import { getModelForClass } from '@typegoose/typegoose';
import { Release } from '../models/release';

const ReleaseModel = getModelForClass(Release);

export default class ReleaseService {
  static async createRelease(releaseData: any) {
    await ReleaseModel.create({ ...releaseData });
  }

  static async getReleases() {
    return ReleaseModel.find({});
  }

  static async getRelease(id: String) {
    return ReleaseModel.findById({ _id: id }).exec();
  }

  static async deleteRelease(id: String) {
    await ReleaseModel.findByIdAndRemove({ _id: id });
  }

  static async updateRelease(id: String, updateBody: object) {
    ReleaseModel.findByIdAndUpdate({ _id: id }, updateBody);
  }
}
