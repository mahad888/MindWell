// firebase-config.ts or firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDd-WWibjFey_POAzMB4dUAK-vXUBQW-fE",
  authDomain: "music1-b0953.firebaseapp.com",
  projectId: "music1-b0953",
  storageBucket: "music1-b0953.appspot.com",
  messagingSenderId: "940209734040",
  appId: "1:940209734040:web:6c97f5cf8ff4796337abed",
  measurementId: "G-JLQJ90WFPM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);