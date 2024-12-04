import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUnZWCptm5YRGEaYbbF3Ltuk6gNm_AwIE",
  authDomain: "fcm-demo-e8f50.firebaseapp.com",
  projectId: "fcm-demo-e8f50",
  storageBucket: "fcm-demo-e8f50.firebasestorage.app",
  messagingSenderId: "429302938934",
  appId: "1:429302938934:web:1a606c3741c7f8915a4797",
  measurementId: "G-420FW6SRQ3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
