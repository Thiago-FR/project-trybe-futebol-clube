import { Router, Request, Response } from 'express';
import { TeamsController } from '../controllers';

export default class TeamsRouter {
  constructor(public router: Router) {
    this.routes();
  }

  private routes() {
    this.router.get(
      '/:id',
      (req: Request, res: Response) => TeamsController.findByPk(req, res),
    );
    this.router.get(
      '/',
      (req: Request, res: Response) => TeamsController.findAll(req, res),
    );
  }
}
