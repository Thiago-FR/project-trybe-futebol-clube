import { IReturnsTeams } from '../interfaces';

export default abstract class TableConstructBasic {
  // #region Table
  private _name: string;

  private _totalPoints = 0;

  private _totalGames = 0;

  private _totalVictories = 0;

  private _totalDraws = 0;

  private _totalLosses = 0;

  private _goalsFavor = 0;

  private _goalsOwn = 0;

  private _goalsBalance = 0;

  private _efficiency = 0;
  // #endregion

  // #region Get and Set

  public get name() { return this._name; }

  public set name(value) { this._name = value; }

  public get totalPoints() { return this._totalPoints; }

  public set totalPoints(value) { this._totalPoints = value; }

  public get totalGames() { return this._totalGames; }

  public set totalGames(value) { this._totalGames = value; }

  public get totalVictories() { return this._totalVictories; }

  public set totalVictories(value) { this._totalVictories = value; }

  public get totalDraws() { return this._totalDraws; }

  public set totalDraws(value) { this._totalDraws = value; }

  public get totalLosses() { return this._totalLosses; }

  public set totalLosses(value) { this._totalLosses = value; }

  public get goalsFavor() { return this._goalsFavor; }

  public set goalsFavor(value) { this._goalsFavor = value; }

  public get goalsOwn() { return this._goalsOwn; }

  public set goalsOwn(value) { this._goalsOwn = value; }

  public get goalsBalance() { return this._goalsBalance; }

  public set goalsBalance(value) { this._goalsBalance = value; }

  public get efficiency() { return this._efficiency; }

  public set efficiency(value) { this._efficiency = value; }

  // #endregion

  public calcVictories() {
    this.totalPoints += 3;
    this.totalGames += 1;
    this.totalVictories += 1;
  }

  public calcDraws() {
    this.totalPoints += 1;
    this.totalGames += 1;
    this.totalDraws += 1;
  }

  public calcLosses() {
    this.totalGames += 1;
    this.totalLosses += 1;
  }

  public calcEfficiency() {
    this.goalsBalance = (this.goalsFavor - this.goalsOwn);
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  public returnTable(): IReturnsTeams {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
