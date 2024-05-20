<<<<<<< HEAD
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
=======
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data || !e.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }

  const resultData = e.data.json().notification;
  const resultURL = e.data.json().data.click_action;
>>>>>>> 3cf5b5aa979896752d7cab412d94281eeeb9645b

  if (!resultData || !resultData.title || !resultData.body) {
    const notificationTitle = "Notification data is incomplete.";
    const notificationOptions = {
      body: "Notification data is incomplete.",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    return;
  }

  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body.split("\\n").join("\n"),
    icon: resultData.image,
    tag: resultData.tag,
    data: { click_action: resultURL },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const resultURL =
    event.notification.data && event.notification.data.click_action;

<<<<<<< HEAD
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
=======
  if (!resultURL) {
    const notificationTitle = "URL is missing.";
    const notificationOptions = {
      body: "Notification click action URL is missing.",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    return;
  }

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === resultURL && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(resultURL);
        }
      })
  );

  event.notification.close();
>>>>>>> 3cf5b5aa979896752d7cab412d94281eeeb9645b
});
