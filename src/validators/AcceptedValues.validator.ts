import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class AcceptedValuesValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const isIncludes = args.constraints.includes(text);
    return isIncludes;
  }
}

export default AcceptedValuesValidator;
