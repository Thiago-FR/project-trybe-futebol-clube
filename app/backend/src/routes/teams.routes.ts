import { Router, Request, Response } from 'express';
import { TeamsController } from '../controllers';
import Auth from '../middlewares/Auth';

export default class TeamsRouter {
  constructor(public router: Router) {
    this.routes();
  }

  private routes() {
    this.router.use(Auth.auth);
    this.router.post(
      '/',
      (req: Request, res: Response) => TeamsController.findAll(req, res),
    );
  }
}
