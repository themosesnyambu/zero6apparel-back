import { Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/user';

const UserModel = getModelForClass(User);

/**
   * A collection of methods that controls authentication responses.
   *
   * @class AuthController
   */
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
  static async userSignup(req :Request, res: Response) {
    const {
      firstName, lastName, email, dateOfBirth, newsletter, password,
    } = req.body;
    await UserModel.create({
      firstName, lastName, email, dateOfBirth, newsletter, password,
    });
    return res.status(201);
  }
  /**
     *
     *  verifies user's email address
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns { JSON } - A JSON object containing success or failure details.
     * @memberof Auth
     */
  //   static async verifyEmail(req, res) {
  //   }

  /**
     * Sends a user reset password link
     *
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns {JSON} A JSON response with a successfully message.
     * @memberof Auth
     */
  //   static async sendResetPasswordEmail(req, res) {
  //   }

  /**
     * Gets user new password object from the request and saves it in the database
     *
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns {JSON} A JSON response with the registered user and a JWT.
     * @memberof Auth
     */
  //   static async resetPassword(req, res) {
  //   }

  /**
     * Verify password reset link token
     *
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns {JSON} A JSON response with password reset link.
     * @memberof Auth
     */
  //   static verifyPasswordResetLink(req, res) {
  //   }

  /**
    *  Login an existing user
    *
    * @param {object} req request object
    * @param {object} res reponse object
    * @returns {object} JSON response
    */
  //   static async loginUser(req, res) {
  //   }

  /**
     * create with facebook data
     *
     * @static
     * @param {object} req - request object
     * @param {object} res - response object
     * @memberof SocialLogin
     * @returns {object} - response body
     *
     */
  //   static async socialLogin(req, res) {
  //   }

  /**
     *  successfully logout a user
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns { JSON } - A JSON object containing success or failure details.
     * @memberof Auth
     */
  //   static logout(req, res) {
  //   }
}
