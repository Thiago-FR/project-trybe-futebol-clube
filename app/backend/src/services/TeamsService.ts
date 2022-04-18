import Teams from '../database/models/Teams';
import { ITeams } from '../interfaces';

export default class TeamsService {
  static async findAll(): Promise<ITeams[]> {
    const team = await Teams.findAll();

    return team as ITeams[];
  }

  static async findByPk(id: number): Promise<ITeams> {
    const team = await Teams.findByPk(id);

    return team as ITeams;
  }
}
