import { IReturnsTeams } from '../interfaces';
import TableConstructBasic from './TableConstructBasic';

export default class TableConstruct extends TableConstructBasic {
  constructor(TableTeam1: IReturnsTeams, TableTeam2: IReturnsTeams[]) {
    super();
    this.name = TableTeam1.name;
    this.totalPoints = TableTeam1.totalPoints;
    this.totalGames = TableTeam1.totalGames;
    this.totalVictories = TableTeam1.totalVictories;
    this.totalDraws = TableTeam1.totalDraws;
    this.totalLosses = TableTeam1.totalLosses;
    this.goalsFavor = TableTeam1.goalsFavor;
    this.goalsOwn = TableTeam1.goalsOwn;

    this.sum(TableTeam2);
  }

  private sum(TableTeam: IReturnsTeams[]): void {
    const findTable = TableTeam.find((table) => this.name === table.name) as IReturnsTeams;

    this.totalPoints += findTable.totalPoints;
    this.totalGames += findTable.totalGames;
    this.totalVictories += findTable.totalVictories;
    this.totalDraws += findTable.totalDraws;
    this.totalLosses += findTable.totalLosses;
    this.goalsFavor += findTable.goalsFavor;
    this.goalsOwn += findTable.goalsOwn;

    this.calcEfficiency();
  }
}
