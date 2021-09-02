import { Request, Response } from 'express';
import UserService from '../services/userService';
import Helpers from '../utils/helpers';

const {
  successResponse, errorResponse, extractUserData,
} = Helpers;

const { getUser } = UserService;

/**
 * A collection of methods that controls user's interaction via the User routes
 *
 * @class UserController
 */
class UserController {
  /**
   * Gets a user profile after registeration or sign-in.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's profile details.
   * @memberof UserController
   */
  static async userProfile(req:Request, res:Response) {
    try {
      const user = await getUser(req.params.id);
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.statusCode, message: error.message });
    }
  }
}

export default UserController;
