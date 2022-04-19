import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) return MatchesController.findSearch(req, res);

    const matche = await MatchesService.findAll();

    return res.status(200).json(matche);
  }

  static async findSearch(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const matche = await MatchesService.findSearch(inProgress === 'true');

    return res.status(200).json(matche);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const matche = await MatchesService.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    return res.status(200).json(matche);
  }

  static async updateMatche(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await MatchesService.update({ inProgress: false }, Number(id));

    return res.status(200).end();
  }

  // static async findByPk(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const user = await TeamsService.findByPk(Number(id));

  //   return res.status(200).json(user);
  // }
}
