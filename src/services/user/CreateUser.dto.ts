import { IsEmail, IsNumber, IsString, Validate } from 'class-validator';
import LengthValidator from 'validators/Length.validator';
import {
  IsUserEmailAlreadyExists,
  IsUserMobileAlreadyExists,
  IsUserNameAlreadyExists,
} from 'validators/db/UserExists.validator';
import BaseUserDto from './BaseUser.dto';

class CreateUserDto extends BaseUserDto {
  @IsString()
  @Validate(LengthValidator, [3, 25], {
    message: 'First name allows minimum 3 & maximum 25 characters',
  })
  public firstName: string;

  @IsString()
  @Validate(LengthValidator, [3, 25], {
    message: 'Last name allows minimum 3 & maximum 25 characters',
  })
  public lastName: string;

  @IsUserEmailAlreadyExists({
    message:
      'User with email: $value already exists, try creating user with another email',
  })
  @IsEmail()
  public email: string;

  @IsNumber()
  @IsUserMobileAlreadyExists({
    message:
      'User with mobile: $value already exists, try creating user with another mobile',
  })
  public mobile: number;

  @IsUserNameAlreadyExists({
    message: 'This username already exists',
  })
  public username: string;
}

export default CreateUserDto;
