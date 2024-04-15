// firebase-messaging-sw.js
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
    console.log("notification click");
    event.notification.close();
    event.waitUntil(clients.openWindow(resultURL));
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
