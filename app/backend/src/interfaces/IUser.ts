import IPayload from './IPayload';

export default interface IUser extends IPayload {
  password?: string,
}
