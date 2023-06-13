import RequestController from "./RequestController";

class NotificationController {
  constructor(user) {
    this.user = user;
    this.requestController = new RequestController(user);
  }

  async subscribeToPushNotifications(expoToken) {
    const { data } = await this.requestController.fetch(
      "notifications/subscribers",
      "POST",
      {
        device_token: expoToken,
      }
    );

    return data;
  }

  async unsubscribeFromPushNotifications(subscriptionId, expoToken) {
    return await this.requestController.fetch(
      `notifications/subscribers/${subscriptionId}`,
      "PATCH",
      {
        device_token: expoToken,
        subscribed: false,
      }
    );
  }

  async sendPushNotification(
    toUserId,
    title,
    subtitle,
    body,
    data,
    sound = "default"
  ) {
    return await this.requestController.fetch("notifications/push", "POST", {
      to_user_id: [toUserId],
      title,
      subtitle,
      body,
      sound,
      data,
    });
  }
}

export default NotificationController;
