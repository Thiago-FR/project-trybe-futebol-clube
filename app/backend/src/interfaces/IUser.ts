import IPayload from './IPayload';

export default interface IUser extends IPayload {
  id?: number,
  password?: string,
}
