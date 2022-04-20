import { NextFunction, Request, Response } from 'express';
import { IStatusCode } from '../interfaces';
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

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const matche = await MatchesService.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    const { statusCode } = matche as IStatusCode;
    return typeof (statusCode) !== 'undefined'
      ? next(matche)
      : res.status(201).json(matche);
  }

  static async updateMatcheInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await MatchesService.update({ inProgress: false }, Number(id));

    return res.status(200).send('Finalizado');
  }

  static async updateMatche(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesService.update({ homeTeamGoals, awayTeamGoals }, Number(id));

    return res.status(200).end();
  }

  // static async findByPk(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const user = await TeamsService.findByPk(Number(id));

  //   return res.status(200).json(user);
  // }
}
