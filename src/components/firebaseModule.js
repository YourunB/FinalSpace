import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBfcKFfd3JDBj3IQiojHp2IHttYR8qf-o4",
  authDomain: "fs1-study.firebaseapp.com",
  databaseURL: "https://fs1-study-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fs1-study",
  storageBucket: "fs1-study.appspot.com",
  messagingSenderId: "42951231627",
  appId: "1:42951231627:web:37caef66e847a6d7ec2c8e"
};

export const app = initializeApp(firebaseConfig);

