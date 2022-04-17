import * as express from 'express';
import ErrorHandle from './middlewares/ErrorHandle';
import LoginRouter from './routes/login.routes';

class App {
  public app: express.Express;

  private loginRoutes = new LoginRouter(express.Router());

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes() {
    this.app.get('/', async (_req, res) => {
      res.status(200).json({ OK: 'OK' });
    });

    this.app.use('/login', this.loginRoutes.router);

    this.app.use(ErrorHandle.handleError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
