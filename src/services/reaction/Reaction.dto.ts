import { IsMongoId, IsString } from 'class-validator';

class CreateReactionDto {
  @IsString()
  public type: string;

  @IsString()
  @IsMongoId()
  public from: string;

  @IsString()
  @IsMongoId()
  public to: string;
}

export default CreateReactionDto;
