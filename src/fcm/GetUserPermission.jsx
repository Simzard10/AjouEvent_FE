import GetFCMToken from "./GetFCMToken";
import { registerServiceWorker } from "../serviceWorkerRegistration";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const GetUserPermission = async (setIsLoading) => {
  try {
    //서비스워커 추가
    await navigator.serviceWorker.register("firebase-messaging-sw.js");

    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length === 0) {
      setIsLoading(true);
      await registerServiceWorker();
      setIsLoading(false);
    }

    if (!("Notification" in window)) {
      alert(
        "브라우저가 웹 알림을 지원하지 않습니다. 브라우저 설정에서 알림 권한과 소프트웨어 버전을 다시 확인 해 주세요."
      );
      return;
    }

    console.log("Checking notification permission...");

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        console.log("Notification permission granted. Ready to send token...");
        setIsLoading(true);
        await GetFCMToken();
        setIsLoading(false);
        let isFCMToken = localStorage.getItem("fcmToken");
        if (!isFCMToken) {
          setIsLoading(true);
          await GetFCMToken();
          setIsLoading(false);
          Toast.fire({
            icon: "error",
            title: `알림 토큰 저장 실패`,
          });
        } else {
          console.log("token setting complete");
        }
      } catch {
        Toast.fire({
          icon: "error",
          title: `알림 토큰 요청 실패`,
        });
      }
    } else {
      alert("알림권한이 허용되어 있지않습니다. 권한을 허용해 주십시오.");
      console.log(
        "Notification permission not granted. Requesting permission..."
      );
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: `알림 설정 요청 실패`,
    });
    console.error("Failed to check or request notification permission:", error);
    setIsLoading(false);
  }
};

export default GetUserPermission;
