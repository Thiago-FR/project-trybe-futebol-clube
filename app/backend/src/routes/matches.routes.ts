import { Router, Request, Response, NextFunction } from 'express';
import { MatchesController } from '../controllers';
import Auth from '../middlewares/Auth';

export default class MatchesRouter {
  constructor(public router: Router) {
    this.routes();
    this.routesValidate();
  }

  private routes() {
    this.router.patch(
      '/:id/finish',
      (req: Request, res: Response) => MatchesController.updateMatcheInProgress(req, res),
    );
    this.router.patch(
      '/:id',
      (req: Request, res: Response) => MatchesController.updateMatche(req, res),
    );
    this.router.get(
      '/:id',
      (req: Request, res: Response) => MatchesController.findOne(req, res),
    );
    this.router.get(
      '/',
      (req: Request, res: Response) => MatchesController.findAll(req, res),
    );
    // this.router.get(
    //   '/:id',
    //   (req: Request, res: Response) => TeamsController.findByPk(req, res),
    // );
  }

  private routesValidate() {
    this.router.use(Auth.auth);
    this.router.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => MatchesController.create(req, res, next),
    );
  }
}
