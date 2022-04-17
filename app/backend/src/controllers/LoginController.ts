import { Request, Response } from 'express';
import IUser from '../interfaces';
import HashToken from '../middlewares/HashToken';
// import UserService from '../services/UserService';

export default class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    const { id, username, role, email } = req.body.user as IUser;

    const token = await HashToken.token({ username, role, email });

    return res.status(200).json({ user: { id, username, role, email }, token });
  }
}
