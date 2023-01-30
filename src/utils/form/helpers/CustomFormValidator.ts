import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { getErrorMessageSimplified } from 'utils/CommonHelpers';

class CustomFormValidator {
  public async validateForm(
    formData: object,
    typeDto: any,
    callback: Function
  ) {
    validate(plainToClass(typeDto, formData), {
      skipMissingProperties: false,
    }).then((errors: ValidationError[]) => {
      if (errors?.length) {
        callback(getErrorMessageSimplified(errors));
      } else {
        callback(null);
      }
    });
  }
}

export default CustomFormValidator;
