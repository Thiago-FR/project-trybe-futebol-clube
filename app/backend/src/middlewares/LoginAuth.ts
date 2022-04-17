import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import HashToken from './HashToken';

export default class LoginAuth {
  static async auth(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await UserService.findOne('email', email);

    if (!user) {
      return next({ statusCode: { code: 404, message: 'Email invalid' } });
    }

    // if (!bcrypt.compareSync(user.password, HashToken.hash(password))) {
    //   return next({ statusCode: {
    //     code: 404,
    //     message: 'Password invalid',
    //   } });
    // }

    req.body.user = user;

    return next();
  }
}
