import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface UserAuthInfoRequest extends Request {
  decoded: JwtPayload | string;
}
