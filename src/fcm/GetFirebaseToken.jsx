// //GetFirebaseToken.jsx
// import React, { useEffect } from "react";
// import axios from "axios";
// import { firebaseApp } from "./firebase";
// import { getMessaging, getToken } from "firebase/messaging";
// import LandingNavbar from "../components/LandingNavbar";

// const GetFirebaseToken = () => {
//   useEffect(() => {
//     const checkAndSendToken = async () => {
//       try {
//         console.log("Checking notification permission...");
//         const permission = await Notification.requestPermission();
//         if (permission === "granted") {
//           console.log(
//             "Notification permission granted. Ready to send token..."
//           );
//           await sendTokenToServer();
//         } else {
//           console.log(
//             "Notification permission not granted. Requesting permission..."
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Failed to check or request notification permission:",
//           error
//         );
//       }
//     };

//     checkAndSendToken();
//   }, []);

//   const sendTokenToServer = async () => {
//     try {
//       const messaging = getMessaging(firebaseApp);
//       const currentToken = await getToken(messaging, {
//         vapidKey:
//           "BFZ7YxE9EWYjsUoDXz6RUqS20dncoD_ZpOpvqywQpTSWuLqaDsW2_ttCFo7ZUmvETmohzwubLRUsbbQ4hj61tvA",
//       });

//       if (currentToken) {
//         console.log("Current Token:", currentToken);

//         const response = await axios.post(
//           "https://ajou-event.shop/users/login",
//           {
//             email: "test1@example.com",
//             password: "Password123",
//             token: currentToken,
//           }
//         );
//         console.log("Server Response:", response.data);
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//       }
//     } catch (error) {
//       console.error(
//         "An error occurred while sending the token to the server:",
//         error
//       );
//     }
//   };

//   return (
//     <div>
//       <LandingNavbar></LandingNavbar>
//       <div style={{ marginTop: "100px" }}>
//         <button onClick={sendTokenToServer}>send token</button>
//       </div>
//     </div>
//   );
// };

// export default GetFirebaseToken;
