abstract class CustomNotification {
    abstract send(): void;

    static notify(notifications: CustomNotification[]): void {
        console.log(notifications);
        notifications.forEach(notification => notification.send());
    }
}

class EmailNotification extends CustomNotification {
    send(): void {
        console.log("Sending email notification");
    }
}

class SMSNotification extends CustomNotification {
    send(): void {
        console.log("Sending SMS notification");
    }
}


const email = new EmailNotification();
email.send();

const sms = new SMSNotification();
sms.send();

CustomNotification.notify([email, sms]);