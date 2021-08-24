import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import env from '../config/env-config';

const { SECRET } = env;

/**
 *Contains Helper methods
 *
 * @class Helpers
 */
export default class Helpers {
  /**
 *  Synchronously sign the given payload into a JSON Web Token string.
 * @static
 * @param {string | number | Buffer | object} payLoad Payload to sign.
 * @param {string | number} expiresIn Expressed in seconds or a string describing a
 * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 1day.
 * @memberof Helpers
 * @returns {string} JWT token.
 */
  static generateToken(payLoad: string | object, expiresIn = '1d') {
    return jwt.sign(payLoad, SECRET!, { expiresIn });
  }

  /**
 *  Synchronously sign the given payload into a JSON Web Token string that never expires.
 * @static
 * @param {string | number | Buffer | object} payLoad Payload to sign.
 * @memberof Helpers
 * @returns {string} JWT token.
 */
  static generateTokenAlive(payLoad: string | object) {
    try {
      return jwt.sign(payLoad, SECRET!);
    } catch (error) {
      return error;
    }
  }

  /**
 *  Generates token upon first signup to be used by subesquent users
 * @static
 * @param {string} letterIdentifier - one letter identifier of establishment.
 * @param {number} id - one letter identifier of establishment
 * @memberof Helpers
 * @returns {string} JWT token.
 */
  static generateTokenOnSignup(letterIdentifier: string, id:number) {
    const randomNumber = Math.floor(Math.random() * 8999 + 1000);
    const anotherRandomNumber = Math.floor(Math.random() * 8999 + 1000);
    const token = `${letterIdentifier}.${id}.${randomNumber}@${anotherRandomNumber}`;
    return token;
  }

  /**
   *
   *  Synchronously verify the given JWT token using a secret
   * @static
   * @param {*} token - JWT token.
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   * @memberof Helpers
   */
  static verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET!);
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }

  /**
 * Hashes a password
 * @static
 * @param {string} password - Password to encrypt.
 * @memberof Helpers
 * @returns {string} - Encrypted password.
 */
  static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
 * Compares a password with a given hash
 * @static
 * @param {string} password - Plain text password.
 * @param {string} hash - Encrypted password.
 * @memberof Helpers
 * @returns {boolean} - returns true if there is a match and false otherwise.
 */
  static comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  /**
 * Checks token from request header for user authentication
 * @param {object} req - The request from the endpoint
 * @memberof Helpers
 * @returns {Token} Token
 */
  static checkToken(req: Request) {
    const {
      headers: { authorization },
      cookies: { token: cookieToken },
    } = req;
    let bearerToken = null;
    if (authorization) {
      bearerToken = authorization.split(' ')[1]
        ? authorization.split(' ')[1] : authorization;
    }
    return cookieToken || bearerToken || req.headers['x-access-token'] || req.headers.token || req.body.token;
  }

  /**
 * Generates a JSON response for success scenarios.
 * @static
 * @param {Response} res - Response object.
 * @param {object} data - The payload.
 * @param {number} code -  HTTP Status code.
 * @memberof Helpers
 * @returns {JSON} - A JSON success response.
 */
  static successResponse(res:Response, data: object, code = 200) {
    return res.status(code).json({
      status: 'success',
      data,
    });
  }

  /**
 * Generates a JSON response for failure scenarios.
 * @static
 * @param {Response} res - Response object.
 * @param {object} options - The payload.
 * @param {number} options.code -  HTTP Status code, default is 500.
 * @param {string} options.message -  Error message.
 * @param {object|array  } options.errors -  A collection of  error message.
 * @memberof Helpers
 * @returns {JSON} - A JSON failure response.
 */
  static errorResponse(res:Response, { code = 500, message = 'Some error occurred while processing your Request' }) {
    return res.status(code).json({
      status: 'fail',
      error: {
        message,
      },
    });
  }

  /**
 * Extracts a new user object from the one supplied
 * @static
 * @param {object} user - The user data from which a new user object will be extracted.
 * @memberof Helpers
 * @returns { object } - The new extracted user object.
 */
  static extractUserData(user:any) {
    return {
      id: user.id,
      token: user.token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      bithdate: user.birthdate,
      role: user.role,
    };
  }
}
