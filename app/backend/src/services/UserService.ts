import Users from '../database/models/Users';
import IUser from '../interfaces';

export default class UserService {
  static async findOne(key: string, value: string): Promise<IUser> {
    const user = await Users.findOne(
      {
        where: { [key]: value },
        attributes: { exclude: ['password'] },
      },
    );

    return user as IUser;
  }
}
