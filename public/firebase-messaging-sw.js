// 🔹 캐시에 unreadCount 저장 및 가져오는 함수
async function getUnreadCountFromCache() {
  const cache = await caches.open("notification-badge-cache");
  const response = await cache.match("unreadCount");

  if (!response) return 0; // 🔹 저장된 값이 없으면 0 리턴

  const count = await response.json();
  return count.unreadCount || 0;
}

async function setUnreadCountToCache(count) {
  const cache = await caches.open("notification-badge-cache");
  const response = new Response(JSON.stringify({ unreadCount: count }));
  await cache.put("unreadCount", response);
}


self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", async function (event) {
  if (!event.data || !event.data.json()) {
    console.error("Push event does not contain valid JSON data.");
    return;
  }

  const data = event.data.json();

  // 🔹 IndexedDB 또는 cacheStorage에 저장할 unreadCount 값 불러오기
  let unreadCount = await getUnreadCountFromCache();
  unreadCount += 1; // 🔹 푸시 알림이 올 때마다 +1 증가

  console.log("Updated unreadCount:", unreadCount); // 🔹 로그 추가

  // 🔹 업데이트된 unreadCount를 저장
  await setUnreadCountToCache(unreadCount);

  console.log(unreadCount)

  let promises = [];

  // 🔹 iOS 및 지원되는 환경에서 배지 업데이트
  if ("setAppBadge" in self.navigator) {
    const badgePromise = self.navigator.setAppBadge(unreadCount).catch(console.error);
    promises.push(badgePromise);
  }

  // 🔹 iOS에서는 반드시 `showNotification()`을 실행해야 푸시 이벤트가 정상 동작함
  const notificationPromise = self.registration.showNotification(data.notification.title, {
    body: data.notification.body,
    icon: data.notification.icon,
    data: { click_action: data.data.click_action },
  });
  promises.push(notificationPromise);

  event.waitUntil(Promise.all(promises));
});

self.addEventListener("message", async function (event) {
  if (event.data.type === "resetUnreadCount") {
    await setUnreadCountToCache(event.data.count || 0); // 🔹 최신 unreadCount 값으로 덮어쓰기
  }
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
