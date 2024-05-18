import { initializeApp } from "firebase/app";
import {
  getMessaging,
  onMessage,
  onBackgroundMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const showNotification = (data) => {
  const resultData = data.notification;
  const resultURL = data.data.click_action;

  if (!resultData || !resultData.title || !resultData.body) {
    console.error("Notification data is incomplete.");
    return;
  }

  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // Close the notification

    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then(function (clientList) {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            // Check if the URL matches
            if (client.url === resultURL && "focus" in client) {
              return client.focus();
            }
          }
          // If no matching client is found, open a new window
          if (clients.openWindow) {
            return clients.openWindow(resultURL);
          }
        })
    );
  });
};

const handlePushEvent = (e) => {
  console.log("Push event received. ", e);
  if (!e.data || !e.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }
  const data = e.data.json();
  showNotification(data);
};

onMessage(messaging, (e) => {
  console.log("Foreground message received. ", e);
  handlePushEvent(e);
});

onBackgroundMessage(messaging, (e) => {
  console.log("Background message received. ", e);
  handlePushEvent(e);
});

self.addEventListener("push", handlePushEvent);

self.addEventListener("install", (e) => {
  console.log("Service worker installed.");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("Service worker activated.");
});
