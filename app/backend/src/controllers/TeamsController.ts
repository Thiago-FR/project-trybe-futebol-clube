import { Request, Response } from 'express';
import UserService from '../services';
// import UserService from '../services/UserService';

export default class TeamsController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    const user = await UserService.findAll();

    return res.status(200).json(user);
  }
}
