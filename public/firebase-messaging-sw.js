importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js"
);

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBSU70NFh3USzDmx8SsRon2UUZ2aBfFQMI",
  authDomain: "ajou-event.firebaseapp.com",
  projectId: "ajou-event",
  storageBucket: "ajou-event.appspot.com",
  messagingSenderId: "605779034389",
  appId: "1:605779034389:web:d3f7dd041db696dffba91c",
  measurementId: "G-1XHZ65LFSE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(firebaseApp);

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

const handlePushEvent = (payload) => {
  console.log("Push event received. ", payload);
  if (!payload.data || !payload.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }
  const data = payload.data.json();
  showNotification(data);
};

messaging.onMessage((payload) => {
  console.log("Foreground message received. ", payload);
  handlePushEvent(payload);
});

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received. ", payload);
  handlePushEvent(payload);
});

self.addEventListener("push", handlePushEvent);

self.addEventListener("install", (e) => {
  console.log("Service worker installed.");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("Service worker activated.");
});
