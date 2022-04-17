import Users from '../database/models/Users';
import IUser from '../interfaces';

export default class UserService {
  static async findOne(key: string, value: string): Promise<IUser> {
    const user = await Users.findOne(
      {
        where: { [key]: value },
      },
    );

    return user as IUser;
  }

  static async findAll(): Promise<IUser[]> {
    const user = await Users.findAll();

    return user as IUser[];
  }
}
