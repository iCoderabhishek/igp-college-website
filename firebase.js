
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendSignInLinkToEmail, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyB4XifRQKvyvKffGykA9bb56meDSXd_mCs",
  authDomain: "ita-college.firebaseapp.com",
  projectId: "ita-college",
  storageBucket: "ita-college.firebasestorage.app",
  messagingSenderId: "511315408613",
  appId: "1:511315408613:web:454c7fcd35805e4b5fc60c",
  measurementId: "G-9RT56GMLWV"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Set persistence for authentication
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Function to handle sign-in using email and password
export const loginUserWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in user:", user);
    return user; // You can use this user for further processing
  } catch (error) {
    console.error("Authentication error:", error.message);
    return null;
  }
};

// Function to send sign-in link to email (magic link sign-in)
export const sendLoginLink = async (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/admin',  // Change this to your production URL
    handleCodeInApp: true, // Sign-in will complete in the app
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email); // Store email for later sign-in
    console.log("Sign-in link sent to email");
    return true;
  } catch (error) {
    console.error("Error sending sign-in link:", error.message);
    return false;
  }
};

// Function to handle sign-in with magic link
export const signInWithLink = async () => {
  const email = window.localStorage.getItem('emailForSignIn');
  if (email) {
    try {
      await auth.signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn'); // Remove the stored email after use
      console.log("User signed in successfully");
      return true;
    } catch (error) {
      console.error("Error during magic link sign-in:", error.message);
      return false;
    }
  } else {
    console.log("No email found in localStorage");
    return false;
  }
};

// Function to listen for auth state changes and handle redirection
export const monitorAuthState = (setUser, setLoading) => {
  auth.onAuthStateChanged((user) => {
    setUser(user);
    setLoading(false);

    if (!user) {
      window.location.href = "/login";  // Redirect to login page if not authenticated
    }
  });
};
