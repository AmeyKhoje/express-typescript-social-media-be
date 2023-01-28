import { IsEmail, IsString, Validate } from 'class-validator';
import LengthValidator from 'validators/Length.validator';
import { IsUserEmailNotExists } from 'validators/db/UserNotExists.validator';

class LoginDto {
  @IsEmail()
  @IsUserEmailNotExists({
    message:
      'User does not exist with privided details. Please check entered details',
  })
  public email: string;

  @IsString()
  @Validate(LengthValidator, [8, 25], {
    message: 'Password should be minimum 8 & maximum 25 characters',
  })
  public password: string;
}

export default LoginDto;
