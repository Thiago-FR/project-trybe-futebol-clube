import { IMatches } from '../interfaces';
import TableConstructBasic from './TableConstructBasic';

export default class TableConstructHome extends TableConstructBasic {
  constructor(name: string) {
    super();
    this.name = name;
  }

  public distributionMatches(id: number, matche: IMatches) {
    if (id === matche.homeTeam) return this.teamHome(matche);
  }

  private teamHome(matche: IMatches) {
    if (matche.homeTeamGoals > matche.awayTeamGoals) {
      this.calcVictories();
      return this.calcGoalsTeamHome(matche);
    }
    if (matche.homeTeamGoals === matche.awayTeamGoals) {
      this.calcDraws();
      return this.calcGoalsTeamHome(matche);
    }
    if (matche.homeTeamGoals < matche.awayTeamGoals) {
      this.calcLosses();
      return this.calcGoalsTeamHome(matche);
    }
  }

  private calcGoalsTeamHome(matche: IMatches) {
    this.goalsFavor += matche.homeTeamGoals;
    this.goalsOwn += matche.awayTeamGoals;
    return this.calcEfficiency();
  }
}
