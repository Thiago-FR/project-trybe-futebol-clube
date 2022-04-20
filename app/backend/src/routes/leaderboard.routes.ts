import { Router, Request, Response } from 'express';
import { LeaderboardController } from '../controllers';

export default class LeaderboardRouter {
  constructor(public router: Router) {
    this.routes();
  }

  private routes() {
    this.router.get(
      '/home',
      (req: Request, res: Response) => LeaderboardController.findAll(req, res),
    );
  }
}
