import { firebaseApp } from "./firebase";
import { getMessaging, getToken } from "firebase/messaging";

const GetFCMToken = async () => {
  try {
    const messaging = getMessaging(firebaseApp);
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BFZ7YxE9EWYjsUoDXz6RUqS20dncoD_ZpOpvqywQpTSWuLqaDsW2_ttCFo7ZUmvETmohzwubLRUsbbQ4hj61tvA",
    });

    if (currentToken) {
      console.log("Current Token:", currentToken);
      localStorage.setItem("fcmToken", currentToken);
      alert("fcmToken in localStorge : " + currentToken);
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
