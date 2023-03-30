import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { User } from '../types/types';
import { authenticator, dbConnection } from './firebaseConfig';
import { Tags } from '../types/types';


const isUserUnique = async (username: string): Promise<boolean> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size === 0;
}

export const addUser = async (userName: string, uid: string) => {
    await setDoc(doc(dbConnection, "users", uid), {
        username: userName,
        about: "",
        messages: [],
        links: [],
        projects: [],
        skills: [],
        img: "",
    });
}

export const register = async (username: string, email: string, password: string): Promise<string> => {
    if (! await isUserUnique(username)) {
        return "username already in use";
    }
    const userCredential = await createUserWithEmailAndPassword(authenticator, email, password);
    await addUser(username, userCredential.user.uid);
    return "success";
}


export const getUserById = async (uid: string): Promise<User> => {
    console.log(uid);
    const docRef = doc(dbConnection, "users", uid);
    const docSnap = (await getDoc(docRef)).data();
    return docSnap as User;
}

export const login = async (email: string, password: string): Promise<User | undefined> => {
    const userCredentials = await signInWithEmailAndPassword(authenticator, email, password);
    const user = await getUserById(userCredentials.user.uid);
    return { username: user.username, uid: userCredentials.user.uid } as User;
}

export const getUserByUserName = async (userName: string): Promise<User | undefined> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", userName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as User;
}

export const getAllTags = async (): Promise<Tags[] | undefined> => {
    const tagsRef = collection(dbConnection, "skills");
    const querySnapshot = await getDocs(query(tagsRef));
    const tags = querySnapshot.docs.map(tag => tag.data());
    return tags as Tags[];
}

export const updateUser = async (user: User): Promise<string> => {
    const docRef = doc(dbConnection, "users", user.uid);
    setDoc(docRef, user, { merge: true });
    return "success";
}

export const addProjectToUser = async (id: string, projectId: string) => {
    const usersRef = doc(dbConnection, "users", id);
    await updateDoc(usersRef, {
        projects: arrayUnion(projectId)
    });
}
