import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import userModel from 'services/user/User.model';

@ValidatorConstraint({ async: true })
class IsUserEmailNotExistsConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    return userModel.findOne({ email }).then((user) => {
      if (user) return true;
      return false;
    });
  }
}

export function IsUserEmailNotExists(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailNotExistsConstraint,
    });
  };
}
