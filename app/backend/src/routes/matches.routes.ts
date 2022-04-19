import { Router, Request, Response, NextFunction } from 'express';
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
      (req: Request, res: Response, next: NextFunction) => MatchesController.create(req, res, next),
    );
    this.router.patch(
      '/:id/finish',
      (req: Request, res: Response) => MatchesController.updateMatche(req, res),
    );
    // this.router.get(
    //   '/:id',
    //   (req: Request, res: Response) => TeamsController.findByPk(req, res),
    // );
  }
}
