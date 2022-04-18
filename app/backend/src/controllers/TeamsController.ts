import { Request, Response } from 'express';
import { TeamsService } from '../services';
// import UserService from '../services/UserService';

export default class TeamsController {
  static async findAll(_req: Request, res: Response): Promise<Response> {
    const user = await TeamsService.findAll();

    return res.status(200).json(user);
  }

  static async findByPk(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await TeamsService.findByPk(Number(id));

    return res.status(200).json(user);
  }
}
