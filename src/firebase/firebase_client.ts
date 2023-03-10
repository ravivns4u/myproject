import {
  getAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  browserPopupRedirectResolver,
} from "firebase/auth"; // New import
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: any = initializeApp(clientCredentials);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);
let analytics: Analytics;

const initAnalytics = async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
};
initAnalytics();
auth.setPersistence(browserLocalPersistence);
auth.useDeviceLanguage();

export default auth;

export { app, db, analytics, storage };

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// For performing operations from FE: https://firebase.google.com/docs/auth/web/manage-users
// For Phone Number Specific Data: https://firebase.google.com/docs/auth/web/phone-auth

//Verifications:

//https://firebase.google.com/docs/auth/web/manage-users
//https://firebase.google.com/docs/auth/custom-email-handler
