import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import LengthValidator from 'validators/Length.validator';

class CreateCommentDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  public from: string;

  @IsString()
  @IsMongoId()
  public to: string;

  @IsString()
  @Validate(LengthValidator, [1, 100], {
    message: 'Comment should be monimum 1 & maximum 100 characters',
  })
  public text: string;

  @IsOptional()
  @IsArray()
  public replies: [];
}

export default CreateCommentDto;
