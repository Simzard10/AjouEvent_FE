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
    // await navigator.serviceWorker.register("firebase-messaging-sw.js");

    // const registrations = await navigator.serviceWorker.getRegistrations();
    // if (registrations.length === 0) {
    //   setIsLoading(true);
    //   await registerServiceWorker();
    //   setIsLoading(false);
    // }

    if (!("Notification" in window)) {
      alert(
        "본 기기는 웹에서 알림설정을 지원하지 않는 기기입니다. 바탕화면에 바로가기 추가 후, 홈페이지 상단에 종모양아이콘 클릭하여 꼭 수동으로 알림설정요청을 해주세요."
      );
      return;
    }

    console.log("Checking notification permission...");

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted. Ready to send token...");
      setIsLoading(true);

      try {
        await GetFCMToken();
        const isFCMToken = localStorage.getItem("fcmToken");
        if (!isFCMToken) {
          throw new Error("알림 토큰 저장 실패");
        } else {
          console.log("Token setting complete");
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message || "알림 토큰 요청 실패",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (permission === "denied") {
      console.log("Notification permission denied.");
      // 필요에 따라 추가 메시지 처리
      setIsLoading(false);  // 로딩 해제
    } else {
      console.log("Notification permission was dismissed.");
      // 필요에 따라 추가 메시지 처리
      setIsLoading(false);  // 로딩 해제
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "알림 설정 요청 실패",
    });
    console.error("Failed to check or request notification permission:", error);
    setIsLoading(false);
  }
};

export default GetUserPermission;
