import { IMatches } from '../interfaces';
import TableConstructBasic from './TableConstructBasic';

export default class TableConstructAway extends TableConstructBasic {
  constructor(name: string) {
    super();
    this.name = name;
  }

  public distributionMatches(id: number, matche: IMatches) {
    if (id === matche.awayTeam) return this.teamAway(matche);
  }

  private teamAway(matche: IMatches) {
    if (matche.awayTeamGoals > matche.homeTeamGoals) {
      this.calcVictories();
      return this.calcGoalsTeamAway(matche);
    }
    if (matche.awayTeamGoals === matche.homeTeamGoals) {
      this.calcDraws();
      return this.calcGoalsTeamAway(matche);
    }
    if (matche.awayTeamGoals < matche.homeTeamGoals) {
      this.calcLosses();
      return this.calcGoalsTeamAway(matche);
    }
  }

  private calcGoalsTeamAway(matche: IMatches) {
    this.goalsFavor += matche.awayTeamGoals;
    this.goalsOwn += matche.homeTeamGoals;
    return this.calcEfficiency();
  }
}
