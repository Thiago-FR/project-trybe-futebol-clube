import Teams from '../database/models/Teams';
import { ITeams } from '../interfaces';

export default class TeamsService {
  // static async findOne(key: string, value: string): Promise<ITeams> {
  //   const team = await Teams.findOne(
  //     {
  //       where: { [key]: value },
  //     },
  //   );

  //   return team as ITeams;
  // }

  static async findAll(): Promise<ITeams[]> {
    const team = await Teams.findAll();

    return team as ITeams[];
  }
}
