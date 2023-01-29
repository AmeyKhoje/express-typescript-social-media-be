import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import HttpException from 'exceptions/HttpException.exception';
import ValidationErrorException from 'exceptions/ValidationError.exception';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getErrorMessageSimplified } from 'utils/CommonHelpers';

const validationMiddleware = (
  type: any,
  skipMissingProperties?: boolean,
  dataAttribute?: string
): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    const body = dataAttribute ? request.body[dataAttribute] : request.body;
    validate(plainToClass(type, body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors?.length) {
          const finalErrors = getErrorMessageSimplified(errors);
          response.send({ success: false, errors: finalErrors });
          next(new ValidationErrorException(400, finalErrors));
        } else {
          next();
        }
      }
    );
  };
};

export default validationMiddleware;
