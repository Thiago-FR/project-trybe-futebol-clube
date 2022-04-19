import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatches } from '../interfaces';

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

  static async create(params: IMatches): Promise<IMatches> {
    const matche = await Matches.create(params);

    return matche as IMatches;
  }

  // static async findByPk(id: number): Promise<ITeams> {
  //   const team = await Matches.findByPk(id);

  //   return team as ITeams;
  // }
}
