import * as bcrypt from 'bcryptjs';
// import * as fs from 'fs/promises';
import * as JWT from 'jsonwebtoken';
import { IPayload } from '../interfaces';

export default class HashToken {
  static hash(secret: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(secret, salt);
  }

  static async token(payload: IPayload): Promise<string> {
    // const JWT_SECRET = await fs.readFile('../../jwt.evaluation.key', 'utf8');
    const JWT_SECRET = 'minha-senha';

    const token = JWT.sign(payload, JWT_SECRET, {
      expiresIn: '16h',
      algorithm: 'HS256',
    });

    return token;
  }
}