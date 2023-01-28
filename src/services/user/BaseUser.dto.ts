import {
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  Validate,
} from 'class-validator';
import LengthValidator from 'validators/Length.validator';

class BaseUserDto {
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

  @IsEmail()
  public email: string;

  @IsNumber()
  public mobile: number;

  @IsObject()
  public location: object;

  @IsString()
  public profileImage: string;

  @IsString()
  public coverImage: string;

  @IsString()
  @Validate(LengthValidator, [5, 15], {
    message: 'User name can be minimum 5 & maximum 15 characters',
  })
  public username: string;

  @IsArray()
  public followers: string[];

  @IsArray()
  public following: string[];

  @IsString()
  @Validate(LengthValidator, [8, 25], {
    message: 'Password can be minimum 8 and maximum 8 characters',
  })
  public password: string;
}

export default BaseUserDto;
