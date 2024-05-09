import { firebaseApp } from "./firebase";
import { getMessaging, getToken } from "firebase/messaging";

const GetFCMToken = async () => {
  try {
    const messaging = getMessaging(firebaseApp);
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (currentToken) {
      localStorage.setItem("fcmToken", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error(
      "An error occurred while sending the token to the server:",
      error
    );
  }
};

export default GetFCMToken;
