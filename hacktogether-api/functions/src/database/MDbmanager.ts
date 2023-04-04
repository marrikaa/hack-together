import { setDoc, doc, arrayUnion, updateDoc, collection, where, query, getDocs, getDoc } from "firebase/firestore";
import { dbConnection } from './firebaseConfig';
import { uuid } from 'uuidv4';
import { Message, Conversation, User } from '../types/types';
import { getUserById } from './UDbManager';


export const createConversation = async (params: Message, receiverUsername: string): Promise<string> => {
    const currentId = uuid();
    await setDoc(doc(dbConnection, "conversations", currentId), {
        person1: params.senderUsername,
        person2: receiverUsername,
        messages: [params],
    });
    return currentId;
}

export const postMessageToConversation = async (message: Message, receiverUsername: string) => {
    const convId = await checkConversation(message.senderUsername, receiverUsername);
    const messageToPost = { ...message, read: false }
    if (convId !== "n/a") {
        const conversationRef = doc(dbConnection, "conversations", convId);
        await updateDoc(conversationRef, {
            messages: arrayUnion(messageToPost)
        });
    }
    else {
        await createConversation(messageToPost, receiverUsername);
    }
}

const checkConversation = async (senderUsername: string, receiverUsername: string): Promise<string> => {
    const usersRef = collection(dbConnection, "conversations");
    const q = query(usersRef, where("person1", "in", [senderUsername, receiverUsername]),
        where("person2", "in", [senderUsername, receiverUsername]))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
        return "n/a";
    }
    return querySnapshot.docs[0].id;
}
export const makeMessageRead = async (convoId: string, username: string) => {
    const conversationRef = doc(dbConnection, "conversations", convoId);
    const conversationSnap = (await getDoc(conversationRef)).data();
    conversationSnap!.messages.forEach((message: Message) => {
        if (message.senderUsername !== username) {
            message.read = true;
        }
    });
    await updateDoc(conversationRef, conversationSnap);
}

export const getConversationsByUserId = async (userId: string): Promise<Conversation[]> => {
    const user: User = await getUserById(userId);
    const usersRef = collection(dbConnection, "conversations");
    const q1 = query(usersRef, where("person1", "==", user.username));
    const q2 = query(usersRef, where("person2", "==", user.username));
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const data = [...querySnapshot1.docs, ...querySnapshot2.docs];
    const conversations = data.map(doc => { return { ...doc.data(), conversationId: doc.id } });
    return conversations as Conversation[];
}

