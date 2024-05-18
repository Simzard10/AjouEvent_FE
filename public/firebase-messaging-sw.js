// firebase-messaging-sw.js
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

onMessage(messaging, (e) => {
  console.log("Message received. ", payload);
  if (!e.data || !e.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }

  const resultData = e.data.json().notification;
  const resultURL = e.data.json().data.click_action;
  self.addEventListener("notificationclick", function (event) {
    event.waitUntil(clients.openWindow(resultURL));
    event.notification.close();
  });

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
});

onBackgroundMessage(messaging, (e) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  if (!e.data || !e.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }

  const resultData = e.data.json().notification;
  const resultURL = e.data.json().data.click_action;
  self.addEventListener("notificationclick", function (event) {
    event.waitUntil(clients.openWindow(resultURL));
    event.notification.close();
  });

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
});

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
  self.addEventListener("notificationclick", function (event) {
    event.waitUntil(clients.openWindow(resultURL));
    event.notification.close();
  });

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
});
