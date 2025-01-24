let badgeCount = 0; // 초기 뱃지 카운트
const pushEventQueue = []; // 푸시 알림 이벤트를 저장하는 큐

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
  // const pushClusterId = e.data.json().data.push_cluster_id;

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
    data: { 
      click_action: resultURL,
      // push_cluster_id: pushClusterId,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  // 뱃지 카운트 +1
  badgeCount += 1;

  // 클라이언트에 메시지 전달
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "updateBadge",
        count: badgeCount,
      });
    });
  });
  
  // 큐에 수신 데이터 추가
  pushEventQueue.push({
    pushClusterId: pushClusterId,
    timestamp: Date.now(),
    eventType: "received", // 수신 이벤트
  });
});

self.addEventListener("notificationclick", function (event) {

  const pushClusterId = event.notification.data.push_cluster_id;

  // 큐에 클릭 데이터 추가
  pushEventQueue.push({
    pushClusterId,
    timestamp: Date.now(),
    eventType: "clicked", // 클릭 이벤트
  });

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

// // 이벤트 데이터를 서버로 배치 전송
// function sendBatchToServer() {
//   if (pushEventQueue.length === 0) {
//     return; // 큐가 비어 있으면 전송하지 않음
//   }

//   const eventsToSend = [...pushEventQueue];
//   pushEventQueue.length = 0;

//   // 수신 및 클릭 이벤트 분리
//   const receivedEvents = eventsToSend.filter((event) => event.eventType === "received");
//   const clickedEvents = eventsToSend.filter((event) => event.eventType === "clicked");

//   // 수신 이벤트 전송
//   if (receivedEvents.length > 0) {
//     receivedEvents.forEach((event) => {
//       fetch("http://localhost:8080/api/push-cluster/received", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(event.pushClusterId),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to send received event");
//           }
//           console.log("Received event sent:", event);
//         })
//         .catch((err) => {
//           console.error("Error sending received event:", err);
//           pushEventQueue.push(event); // 실패한 이벤트를 큐에 다시 추가
//         });
//     });
//   }

//   // 클릭 이벤트 전송
//   if (clickedEvents.length > 0) {
//     clickedEvents.forEach((event) => {
//       fetch("http://localhost:8080/api/push-cluster/clicked", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(event.pushClusterId),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to send clicked event");
//           }
//           console.log("Clicked event sent:", event);
//         })
//         .catch((err) => {
//           console.error("Error sending clicked event:", err);
//           pushEventQueue.push(event); // 실패한 이벤트를 큐에 다시 추가
//         });
//     });
//   }
// }

// // 주기적으로 배치 전송 실행
// setInterval(() => {
//   sendBatchToServer();
// }, 10000); // 10초마다 실행