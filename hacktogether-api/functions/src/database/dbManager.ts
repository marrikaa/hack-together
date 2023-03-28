import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc, getDoc, where, query, getDocs } from "firebase/firestore";
import { User } from '../types/types';
import { authenticator, dbConnection } from './firebaseConfig';

const addUser = async (userName: string, uid: string) => {
    try {
        await setDoc(doc(dbConnection, "users", uid), {
            username: userName,
            about: "",
            messages: [],
            links: [],
            projects: [],
            skills: [],
            img: "",

        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const isUserUnique = async (username: string): Promise<boolean> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size === 0;
}

const getUser = async (uid: string): Promise<User> => {
    const docRef = doc(dbConnection, "users", uid);
    const docSnap = (await getDoc(docRef)).data();
    return docSnap as User;
}

export const register = async (username: string, email: string, password: string): Promise<string> => {
    if (! await isUserUnique(username)) {
        return "username already in use";
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(authenticator, email, password);
        await addUser(username, userCredential.user.uid);
        return "success";
    } catch (error: any) {
        return error.message;
    }
}

export const login = async (email: string, password: string): Promise<User | undefined> => {
    const userCredentials = await signInWithEmailAndPassword(authenticator, email, password);
    const user = await getUser(userCredentials.user.uid);
    return user as User;
}

export const getUserByUserName = async (userName: string): Promise<User | undefined> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", userName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as User;
}
