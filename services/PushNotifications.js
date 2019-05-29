import { Permissions, Notifications } from 'expo';

export const getNotificationToken = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return finalStatus;
  }

  return Notifications.getExpoPushTokenAsync();
};
