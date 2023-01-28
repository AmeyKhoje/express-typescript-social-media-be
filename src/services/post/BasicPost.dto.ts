import LengthValidator from 'validators/Length.validator';
import { IsMongoId, IsOptional, IsString, Validate } from 'class-validator';

class BasicPostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @Validate(LengthValidator, [0, 100], {
    message: 'Post description should be maximum 100 characters',
  })
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  @IsMongoId({
    message: 'Wrong author provided',
  })
  author: string;
}

export default BasicPostDto;
