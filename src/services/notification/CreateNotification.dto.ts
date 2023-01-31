import AcceptedValuesValidator from 'validators/AcceptedValues.validator';
import {
  IsArray,
  IsMongoId,
  IsObject,
  IsString,
  Validate,
} from 'class-validator';
import { notificationTypes } from 'utils/constants/DataConstants';

class CreateNotificationDto {
  @IsString()
  public title: string;

  @IsString()
  public text: string;

  @IsString()
  @IsMongoId()
  public createdBy: string;

  @IsArray()
  public createdFor: [];

  @IsObject()
  public extraData: object;

  @IsString()
  @Validate(AcceptedValuesValidator, notificationTypes, {
    message: `Notification type not specified from accepted values. Accepted values: ${notificationTypes.join(
      ', '
    )}`,
  })
  public actionType: string;
}

export default CreateNotificationDto;
