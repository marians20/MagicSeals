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
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.useDeviceLanguage();

const analytics = getAnalytics(app);

const login = async () => {
  try {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  // The signed-in user info.
  const user = result.user;
  return { user, credential, token };
  }
  catch(error: any) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    throw new Error(errorMessage);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const logout = async () => {
  await signOut(auth);
}

export { app, auth, analytics, login, logout};
