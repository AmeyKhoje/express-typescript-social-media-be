import CustomFormValidator from 'utils/form/helpers/CustomFormValidator';
import CreateNotificationDto from './CreateNotification.dto';
import notificationModel from './Notification.model';

class NotificationService {
  private NotificationModel = notificationModel;
  private formValidator = new CustomFormValidator();

  public async create(notificationRequestData: CreateNotificationDto) {
    let status: boolean = false;
    this.formValidator.validateForm(
      notificationRequestData,
      CreateNotificationDto,
      async (errors: []) => {
        if (errors?.length) {
          status = false;
        } else {
          try {
            const actionType = notificationRequestData.actionType;
            await this.NotificationModel.create(notificationRequestData);
            status = true;
          } catch (error) {
            status = false;
          }
        }
      }
    );

    return status;
  }
}

export default NotificationService;
