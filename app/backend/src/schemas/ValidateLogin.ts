import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static joi(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { error } = Joi.object({
      email: Joi.string().email().required().messages({
        'any.required': '400|"email" is required',
        'string.empty': '400|"email" is not allowed to be empty',
        'string.email': '400|"email" must be a valid email',
      }),
      password: Joi.string().min(6).required().messages({
        'any.required': '400|"password" is required',
        'string.empty': '400|"password" is not allowed to be empty',
        'string.min': '422|Password must be longer than 6 characters',
      }),
    }).validate({ email, password });

    if (error) return next(error);

    return next();
  }
}
