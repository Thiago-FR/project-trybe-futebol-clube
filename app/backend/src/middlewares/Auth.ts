import { NextFunction, Request, Response } from 'express';
// import * as fs from 'fs/promises';
import * as JWT from 'jsonwebtoken';
import IUser from '../interfaces';

export default class Auth {
  static async auth(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    // const JWT_SECRET = await fs.readFile('../../jwt.evaluation.key', 'utf8');
    const JWT_SECRET = 'minha-senha';

    if (!authorization) {
      return next({ statusCode: {
        code: 401,
        message: 'Token not found',
      } });
    }

    try {
      const decoded = JWT.verify(authorization, JWT_SECRET);

      req.body.user = decoded as IUser;

      return next();
    } catch (error: any) {
      return next({ statusCode: {
        code: 401,
        message: error.message === 'jwt malformed' ? 'Expired or invalid token' : error.message,
      } });
    }
  }
}
