import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Helpers from '../utils/helpers';

const {
  errorResponse, verifyToken, checkToken,
} = Helpers;

/**
 * Middleware for input validations
 */
export default class AuthMiddleware {
/**
    * Middleware method for user authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */
  static isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const token = checkToken(req);
      // console.log(checkToken(req));
      const decoded = verifyToken(token);
      req.user = decoded;
      let id;
      if (typeof (decoded) === 'object') {
        id = decoded.id;
      }
      if (userId === id) {
        next();
      } else {
        throw new Error('invalid input ');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }

  /**
    * Middleware method for authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */
  static authenticate(req:Request, res: Response, next: NextFunction) {
    const token = checkToken(req);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET!, (err:any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      return next();
    });
    return next();
  }
}
