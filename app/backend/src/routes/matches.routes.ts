import { Router, Request, Response } from 'express';
import { MatchesController } from '../controllers';
import Auth from '../middlewares/Auth';

export default class MatchesRouter {
  constructor(public router: Router) {
    this.routes();
  }

  private routes() {
    this.router.use(Auth.auth);
    this.router.get(
      '/',
      (req: Request, res: Response) => MatchesController.findAll(req, res),
    );
    this.router.post(
      '/',
      (req: Request, res: Response) => MatchesController.create(req, res),
    );
    // this.router.get(
    //   '/:id',
    //   (req: Request, res: Response) => TeamsController.findByPk(req, res),
    // );
  }
}
