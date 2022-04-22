import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatches, IStatusCode } from '../interfaces';
import TeamsService from './TeamsService';

export default class MatchesService {
  static async findAll(): Promise<IMatches[]> {
    const matche = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matche as IMatches[];
  }

  static async findSearch(query: boolean): Promise<IMatches[]> {
    const matche = await Matches.findAll({
      where: { inProgress: query },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matche as IMatches[];
  }

  static async create(params: IMatches): Promise<IMatches | IStatusCode> {
    const { homeTeam, awayTeam } = params;

    if (homeTeam === awayTeam) {
      return { statusCode:
        { code: 401, message: 'It is not possible to create a match with two equal teams' } };
    }

    const home = await TeamsService.findByPk(homeTeam);
    const away = await TeamsService.findByPk(awayTeam);

    if (!home || !away) {
      return { statusCode: { code: 404, message: 'There is no team with such id!' } };
    }

    const matche = await Matches.create(params);

    return matche as IMatches;
  }

  static async update(params: any, id: number): Promise<void> {
    await Matches.update(params, { where: { id } });
  }

  static async findOne(id: number): Promise<IMatches> {
    const team = await Matches.findOne({
      where: { id },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return team as IMatches;
  }
}
