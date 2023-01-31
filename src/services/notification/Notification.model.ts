import { Document, Schema, model } from 'mongoose';
import NotificationInterfce from './Notification.interface';

const notificationSchema = new Schema<NotificationInterfce>({
  title: 'string',
  text: 'string',
  createdBy: 'string',
  createdFor: [],
  extraData: 'object',
});

const notificationModel = model<NotificationInterfce & Document>(
  'Notification',
  notificationSchema
);

export default notificationModel;
