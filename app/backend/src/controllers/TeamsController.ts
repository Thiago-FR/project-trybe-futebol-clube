import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
// import UserService from '../services/UserService';

export default class TeamsController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    const user = await TeamsService.findAll();

    return res.status(200).json(user);
  }
}
