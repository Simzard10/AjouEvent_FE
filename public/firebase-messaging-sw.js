self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (event) {
  if (!event.data || !event.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }

  const data = event.data.json();

  let promises = [];

  // 🔹 iOS에서는 showNotification() 필수 실행 (백그라운드 푸시 활성화 조건)
  const notificationPromise = self.registration.showNotification(data.notification.title, {
    body: data.notification.body,
    icon: data.notification.icon,
    data: { click_action: data.data.click_action },
  });
  promises.push(notificationPromise);

  // 🔹 PWA 실행 중이면 배지 업데이트를 요청
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "updateBadge", // 🔹 PWA에서 배지를 업데이트하도록 요청
      });
    });
  });

  event.waitUntil(Promise.all(promises));
});

self.addEventListener("notificationclick", function (event) {
  const resultURL =
    event.notification.data && event.notification.data.click_action;

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
});
