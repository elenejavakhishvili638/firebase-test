// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAq6HPqGw6Nq9e1wWK_n8of0Brs8mLRpro",
  authDomain: "test-99dde.firebaseapp.com",
  projectId: "test-99dde",
  storageBucket: "test-99dde.appspot.com",
  messagingSenderId: "435134794396",
  appId: "1:435134794396:web:d8333cb3aea911961a3b59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
