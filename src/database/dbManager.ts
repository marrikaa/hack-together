import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authenticator } from '../firebaseConfig';

export const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(authenticator, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            console.log("here");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
}

export const login = (email: string, password: string) => {
    signInWithEmailAndPassword(authenticator, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(userCredential);
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
}