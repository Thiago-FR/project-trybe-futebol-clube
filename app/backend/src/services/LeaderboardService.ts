import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import TableConstruct from '../helpers/TableConstruct';
import { IMatches, IReturnsTeams } from '../interfaces';

export default class LeaderboardService {
  static async findAll(): Promise<IReturnsTeams[]> {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();

    const newTeam = teams.map(({ id, teamName }) => {
      const team = new TableConstruct(teamName);

      matches.forEach((matche: IMatches) =>
        (!matche.inProgress ? team.distributionMatches(id, matche) : null));

      return team.returnTable() as IReturnsTeams;
    });

    return newTeam as IReturnsTeams[];
  }
}
