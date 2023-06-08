class NotificationController {
  constructor(user) {
    this.user = user;
  }

  async subscribeToPushNotifications(expoToken) {
    const response = await fetch(
      "https://notifications-notifications-danielovera.cloud.okteto.net/api/v1/subscribers/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.user.uid,
          device_token: expoToken,
        }),
      }
    );

    const { data } = await response.json();
    return data;
  }

  async unsubscribeFromPushNotifications(subscriptionId, expoToken) {
      const response = await fetch(
          `https://notifications-notifications-danielovera.cloud.okteto.net/api/v1/subscribers/${subscriptionId}`,
          {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  user_id: this.user.uid,
                  device_token: expoToken,
                  subscribed: false
              }),
          }
      );

      return await response.json();
  }

  async sendPushNotification(toUserId, title, subtitle, body, data, sound = "default") {
      const response = await fetch(
          'https://notifications-notifications-danielovera.cloud.okteto.net/api/v1/notifications/push',
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  to_user_id: [toUserId],
                  title,
                  subtitle,
                  body,
                  sound,
                  data
              }),
          }
      );

      return await response.json();
  }
}

export default NotificationController;
