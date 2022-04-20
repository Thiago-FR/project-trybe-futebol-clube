import { Router, Request, Response } from 'express';
import ValidateLogin from '../schemas';
import LoginController from '../controllers';
import LoginAuth from '../middlewares/LoginAuth';
import Auth from '../middlewares/Auth';

export default class LoginRouter {
  constructor(public router: Router) {
    this.routesValidate();
    this.routes();
  }

  private routes() {
    this.router.use(ValidateLogin.joi);
    this.router.use(LoginAuth.auth);
    this.router.post(
      '/',
      (req: Request, res: Response) => LoginController.login(req, res),
    );
  }

  private routesValidate() {
    this.router.use(Auth.auth);
    this.router.get(
      '/validate',
      (req: Request, res: Response) => LoginController.validade(req, res),
    );
  }
}
