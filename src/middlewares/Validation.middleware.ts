import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import ValidationErrorException from 'exceptions/ValidationError.exception';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getErrorMessageSimplified } from 'utils/CommonHelpers';

const validationMiddleware = (
  type: any,
  skipMissingProperties?: boolean
): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    validate(plainToClass(type, request.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length) {
          const finalErrors = getErrorMessageSimplified(errors);
          next(new ValidationErrorException(400, finalErrors));
        } else {
          next();
        }
      }
    );
  };
};

export default validationMiddleware;
