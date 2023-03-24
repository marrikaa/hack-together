import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCif3XzW5w4rz54KEmg6EMbN7vFIUgtsUU",
    authDomain: "hacktogether-ec643.firebaseapp.com",
    projectId: "hacktogether-ec643",
    storageBucket: "hacktogether-ec643.appspot.com",
    messagingSenderId: "16046279231",
    appId: "1:16046279231:web:bd3c4a87d72e3d8ae5c68a",
    measurementId: "G-42QMG6670T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const dbConnection = app;
export const authenticator = auth;