import GetFCMToken from "./GetFCMToken";
import { registerServiceWorker } from "../serviceWorkerRegistration";

const GetUserPermission = async (setIsLoading) => {
  try {
    if (!("Notification" in window)) {
      alert(
        "브라우저가 웹 알림을 지원하지 않음. 알림기능 사용을 원하시면 다른 브라우저를 사용해주세요."
      );
      return;
    }

    console.log("Checking notification permission...");

    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length === 0) {
      await registerServiceWorker();
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted. Ready to send token...");
      setIsLoading(true);
      await GetFCMToken();
      setIsLoading(false);
      let isFCMToken = localStorage.getItem("fcmToken");
      if (!isFCMToken) {
        setIsLoading(true);
        await GetFCMToken();
        setIsLoading(false);
      }
    } else {
      alert("알림권한이 허용되어 있지않습니다. 권한을 허용해 주십시오.");
      console.log(
        "Notification permission not granted. Requesting permission..."
      );
    }
  } catch (error) {
    alert("알림 기기 등록 오류");
    console.error("Failed to check or request notification permission:", error);
    setIsLoading(false);
  }
};

export default GetUserPermission;
