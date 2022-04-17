import IUser, { IPayload } from '../../interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser,
    payload?: IPayload,
  }
}
