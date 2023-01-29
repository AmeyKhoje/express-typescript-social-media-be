import { IsMongoId, IsOptional, IsString, Validate } from 'class-validator';
import AcceptedValuesValidator from 'validators/AcceptedValues.validator';

const reactions = ['LAUGH', 'ANGRY', 'LIKE', 'AWKWARD'];
class CreateReactionDto {
  @IsString()
  @Validate(AcceptedValuesValidator, reactions, {
    message: 'Please send acceptable reaction',
  })
  public type: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  public from: string;

  @IsString()
  @IsMongoId()
  public to: string;
}

export default CreateReactionDto;
