import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  static async findAll(_req: Request, res: Response): Promise<Response> {
    const matche = await MatchesService.findAll();

    return res.status(200).json(matche);
  }

  // static async findByPk(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const user = await TeamsService.findByPk(Number(id));

  //   return res.status(200).json(user);
  // }
}
