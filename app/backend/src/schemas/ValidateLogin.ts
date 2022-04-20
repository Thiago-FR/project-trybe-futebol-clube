import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const incorrect = 'Incorrect email or password';
const allFields = 'All fields must be filled';

export default class ValidateLogin {
  static joi(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { error } = Joi.object({
      email: Joi.string().email().required().messages({
        'any.required': `400|${allFields}`,
        'string.empty': `400|${allFields}`,
        'string.email': `401|${incorrect}`,
      }),
      password: Joi.string().min(6).required().messages({
        'any.required': `400|${allFields}`,
        'string.empty': `400|${allFields}`,
        'string.min': `401|${incorrect}`,
      }),
    }).validate({ email, password });

    if (error) return next(error);

    return next();
  }
}
