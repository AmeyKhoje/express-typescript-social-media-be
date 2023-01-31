interface NotificationInterfce {
  _id: string;
  title: string;
  text: string;
  createdBy: string;
  createdFor: [];
  extraData: object;
}

export default NotificationInterfce;
