import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';

export default class LoginAuth {
  static async auth(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await UserService.findOne('email', email);

    if (!user) {
      return next({ statusCode: { code: 401, message: 'Incorrect email or password' } });
    }

    if (!bcrypt.compareSync(password, user.password as string)) {
      return next({ statusCode: { code: 401, message: 'Incorrect email or password' } });
    }

    req.body.user = user;

    return next();
  }
}
