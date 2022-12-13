// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { environment } from "src/environments/environment";
// Initialize Firebase
console.log(`Author: ${environment.author}`);
const app = initializeApp(environment.firebaseConfig);
const firebaseAuth = getAuth(app);
firebaseAuth.useDeviceLanguage();

const analytics = getAnalytics(app);

export { app, firebaseAuth, analytics};
