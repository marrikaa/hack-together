import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authenticator, dbConnection } from '../../../backend/firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { User } from '../types/types';


const addUser = async (userName: string, uid: string) => {
    try {
        await setDoc(doc(dbConnection, "users", uid), {
            username: userName
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
const getUser = async (uid: string): Promise<User> => {
    const docRef = doc(dbConnection, "users", uid);
    const docSnap = await (await getDoc(docRef)).data();
    return docSnap as User;
}

export const register = (username: string, email: string, password: string) => {
    createUserWithEmailAndPassword(authenticator, email, password)
        .then((userCredential) => {
            addUser(username, userCredential.user.uid)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const login = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(authenticator, email, password);
        const user = await getUser(userCredentials.user.uid);
        return user as User;
    }
    catch (error) {
        console.log(error);
    }
    return undefined;
}
