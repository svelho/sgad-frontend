// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRB71_1rLuCBwna1U76tu-_EKvYePt_Ds",
  authDomain: "sgad-production.firebaseapp.com",
  projectId: "sgad-production",
  storageBucket: "sgad-production.appspot.com",
  messagingSenderId: "988059882353",
  appId: "1:988059882353:web:abc24c461885cc2d0ddcd0",
  measurementId: "G-VNXJ9MQ11L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//const analytics = getAnalytics(app);
