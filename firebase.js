import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVM75ITt9XhCX0Zq5FyB_UYFd6I7JVlC0",
  authDomain: "taskflow-a4abc.firebaseapp.com",
  projectId: "taskflow-a4abc",
  storageBucket: "taskflow-a4abc.firebasestorage.app",
  messagingSenderId: "229804855283",
  appId: "1:229804855283:web:36776aca4f030e4169cc86"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
