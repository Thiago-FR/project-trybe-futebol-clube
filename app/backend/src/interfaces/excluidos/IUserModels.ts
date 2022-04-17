import IUser from '../IUser';
import IWhere from './IWhere';

export default interface IUserModels {
  findOne: (object: IWhere) => IUser,
}
