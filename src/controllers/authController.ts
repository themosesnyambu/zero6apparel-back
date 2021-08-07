import { Request, Response } from 'express';
import UserService from '../services/userService';
import Helpers from '../utils/helpers';
/**
   * A collection of methods that controls authentication responses.
   *
   * @class AuthController
*/

const { createUser, findUser } = UserService;
const { generateToken, comparePassword } = Helpers;

export default class AuthController {
  /**
     * Registers a new user.
     *
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns { JSON } A JSON response with the registered user's details and a JWT.
     * @memberof Auth
     */
  static async userSignup(req : Request, res: Response) {
    const { body } = req;
    const user = await createUser({ ...body });
    const token = generateToken({ email: user.email, id: user.id, role: user.role });
    res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
    return res.status(201).send(user);
  }

  /**
     * Logs in a user.
     *
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns { JSON } A JSON response with the logged in user's details and a JWT.
     * @memberof Auth
     */
  static async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user) {
      return res.status(401);
    }
    if (!comparePassword(password, user.password!)) {
      return res.status(401);
    }
    const token = generateToken({ email: user.email, id: user.id, role: user.role });
    res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
    return res.status(200).send(user);
  }

  /**
   *  successfully logout a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof Auth
   */
  static logout(req:Request, res:Response) {
    try {
      res.clearCookie('token', { httpOnly: true });
      return res.status(200);
    } catch (error) {
      return res.send(error);
    }
  }
}
