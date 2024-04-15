import GetFCMToken from "./GetFCMToken";

const GetUserPermission = async () => {
  try {
    console.log("Checking notification permission...");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted. Ready to send token...");
      await GetFCMToken();
    } else {
      console.log(
        "Notification permission not granted. Requesting permission..."
      );
    }
  } catch (error) {
    console.error("Failed to check or request notification permission:", error);
  }
};

export default GetUserPermission;
