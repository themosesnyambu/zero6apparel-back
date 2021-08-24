import { getModelForClass } from '@typegoose/typegoose';
import { Release } from '../models/release';

const ReleaseModel = getModelForClass(Release);

export default class ReleaseService {
  static async createRelease(releaseData: any) {
    const newRelease = await ReleaseModel.create({ ...releaseData });
    return newRelease;
  }

  static async getReleases() {
    return ReleaseModel.find();
  }

  static async getRelease(id: String) {
    return ReleaseModel.findById({ _id: id }, (err, docs) => {
      if (err) {
        return err;
      }
      return docs;
    });
  }

  static async deleteRelease(id: String) {
    return ReleaseModel.deleteOne({ _id: id });
  }

  static async updateRelease(id: String, updateBody: object) {
    ReleaseModel.findByIdAndUpdate({ _id: id }, updateBody);
  }
}
