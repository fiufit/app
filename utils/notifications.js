export const uniqueNotifications = (notifications) => {
    const uniqueNotifications = [];

    notifications.forEach((notification) => {
        if (!uniqueNotifications.filter(n => n.body === notification.body).length) {
            uniqueNotifications.push(notification);
        }
    });

    return uniqueNotifications;
}

export const getNotificationIdByBody = (notifications, body) => {
    const notification = notifications.find(n => n.body === body);
    return notification?.id;
}
