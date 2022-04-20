import Matches from '../database/models/Matches';

export default class LeaderboardService {
  static async findAll(): Promise<any> {
    const team = await Matches.findAll();
    return team as any[];
  }
}
