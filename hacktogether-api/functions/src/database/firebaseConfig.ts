import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export const dbConnection = db;
export const authenticator = auth;
export const dbStorage = storage;














// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyAqPgnsKnznk7ECPYNV9niOJ2atq5PysAI",
//     authDomain: "hacktogether-1b17f.firebaseapp.com",
//     projectId: "hacktogether-1b17f",
//     storageBucket: "hacktogether-1b17f.appspot.com",
//     messagingSenderId: "904232761521",
//     appId: "1:904232761521:web:f7afa7e09349e1e33d0a90",
//     measurementId: "G-51NKH6Y1FW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export const dbConnection = db;
// export const authenticator = auth;

