export const uniqueNotifications = (notifications) => {
    let uniqueNotifications = [];

    notifications.forEach((notification) => {
        if (!uniqueNotifications.filter(n => n.body === notification.body).length) {
            uniqueNotifications.push(notification);
        }
    });

    return uniqueNotifications.filter((notification) => notification.data.type !== "NEW_MESSAGE");
}

export const getNotificationIdByBody = (notifications, body) => {
    const notification = notifications.find(n => n.body === body);
    return notification?.id;
}
