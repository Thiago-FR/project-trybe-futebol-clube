import { Request, Response } from 'express';
import { TableConstructHome, TableConstructAway } from '../helpers';
// import { IStatusCode } from '../interfaces';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  static async findAllHome(_req: Request, res: Response): Promise<Response> {
    const teamHome = await LeaderboardService.findAll(TableConstructHome);

    return res.status(200).json(teamHome);
  }

  static async findAllAway(_req: Request, res: Response): Promise<Response> {
    const teamAway = await LeaderboardService.findAll(TableConstructAway);

    return res.status(200).json(teamAway);
  }

  static async findAll(_req: Request, res: Response): Promise<Response> {
    const teamHome = await LeaderboardService.findAll(TableConstructHome);
    const teamAway = await LeaderboardService.findAll(TableConstructAway);

    const team = LeaderboardService.findAllSumTables(teamHome, teamAway);

    return res.status(200).json(team);
  }
}
