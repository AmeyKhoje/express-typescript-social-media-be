import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import userModel from 'services/user/User.model';

@ValidatorConstraint({ async: true })
class IsUserEmailAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string, args: ValidationArguments) {
    return userModel.findOne({ email }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUserEmailAlreadyExists(
  validationOptions?: ValidationOptions
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailAlreadyExistsConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
class IsUserMobileAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  validate(mobile: string, args: ValidationArguments) {
    return userModel.findOne({ mobile }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUserMobileAlreadyExists(
  validationOptions?: ValidationOptions
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserMobileAlreadyExistsConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
class IsUserNameAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  validate(username: string, args: ValidationArguments) {
    return userModel.findOne({ username }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUserNameAlreadyExists(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNameAlreadyExistsConstraint,
    });
  };
}
