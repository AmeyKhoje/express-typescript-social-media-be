import {ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint} from 'class-validator'

@ValidatorConstraint()
class LengthValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.length >= args.constraints[0] && text.length <= args.constraints[1]
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `This field should have minimum ${validationArguments.constraints[0]} & maximum ${validationArguments.constraints[1]} characters.`
  }
}

export default LengthValidator