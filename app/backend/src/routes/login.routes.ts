import { Router, Request, Response } from 'express';
import ValidateLogin from '../schemas';
import LoginController from '../controllers';
import LoginAuth from '../middlewares/LoginAuth';

export default class LoginRouter {
  constructor(public router: Router) {
    this.routes();
  }

  private routes() {
    this.router.post(
      '/',
      ValidateLogin.joi,
      LoginAuth.auth,
      (req: Request, res: Response) => LoginController.login(req, res),
    );
  }
}
