// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALUFP1XYXEoZeqV_-_xksdbYHo3FoyPls",
  authDomain: "magic-sigils.firebaseapp.com",
  projectId: "magic-sigils",
  storageBucket: "magic-sigils.appspot.com",
  messagingSenderId: "221956834710",
  appId: "1:221956834710:web:65c12fed9dc61f6cf649b7",
  measurementId: "G-2HC4ZC2KD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
