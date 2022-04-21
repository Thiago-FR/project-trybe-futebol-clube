import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatches, IReturnsTeams } from '../interfaces';
import TableConstruct from '../helpers';

export default class LeaderboardService {
  static async findAll(Table: any): Promise<IReturnsTeams[]> {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();

    const newTeam = teams.map(({ id, teamName }) => {
      const team = new Table(teamName);

      matches.forEach((matche: IMatches) =>
        (!matche.inProgress ? team.distributionMatches(id, matche) : null));

      return team.returnTable() as IReturnsTeams;
    });

    return LeaderboardService.sort(newTeam);
  }

  static findAllSumTables(teamHome: IReturnsTeams[], teamAway: IReturnsTeams[]) {
    const newTeam = teamHome.map((team) => {
      const teamTable = new TableConstruct(team, teamAway);

      return teamTable.returnTable() as IReturnsTeams;
    });

    return LeaderboardService.sort(newTeam);
  }

  static sort(table: IReturnsTeams[]) {
    table.sort((a, b) => {
      switch (true) {
        case a.totalPoints > b.totalPoints: return -1;
        case a.totalPoints < b.totalPoints: return 1;
        case a.totalVictories > b.totalVictories: return -1;
        case a.totalVictories < b.totalVictories: return 1;
        case a.goalsBalance > b.goalsBalance: return -1;
        case a.goalsBalance < b.goalsBalance: return 1;
        case a.goalsFavor > b.goalsFavor: return -1;
        case a.goalsFavor < b.goalsFavor: return 1;
        case a.goalsOwn < b.goalsOwn: return 1;
        case a.goalsOwn > b.goalsOwn: return -1;
        default: return 0;
      }
    });

    return table;
  }
}
