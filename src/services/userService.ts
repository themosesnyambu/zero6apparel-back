import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/user';
import Helpers from '../utils/helpers';

const UserModel = getModelForClass(User);

const { hashPassword } = Helpers;

export default class UserService {
  static async createUser(userData: any) {
    // eslint-disable-next-line no-param-reassign
    userData.password = hashPassword(userData.password);
    const newUser = await UserModel.create({ ...userData });
    return newUser;
  }

  static async getUsers() {
    return UserModel.find({});
  }

  static async getUser(id: String) {
    const dbUser = UserModel.findOne({ id });
    return dbUser;
  }

  static async deleteUser(id: String) {
    await UserModel.findByIdAndRemove({ _id: id });
  }

  static async updateUser(id: String, updateBody: object) {
    UserModel.findByIdAndUpdate({ _id: id }, updateBody);
  }

  static async findUser(email: String) {
    const dbUser = UserModel.findOne({ email });
    return dbUser;
  }
}
