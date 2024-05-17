//  Scripts for firebase and firebase messaging

importScripts("https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/8.2.10/firebase-analytics.js",
);

var firebaseConfig;
async function getFirebaseConfig() {

    await fetch("/api/sitecore/Reminders/GetFireBaseValues")
        .then(res => {
            return res.json()
        })
        .then(data => {
            firebaseConfig = data;
            if (firebaseConfig) {
                firebase.initializeApp(firebaseConfig)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

getFirebaseConfig();

if (firebaseConfig) {
    const messaging = firebase.messaging()
    messaging.onBackgroundMessage(function (payload) {
        console.log("Received background message ", payload);

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });

}
