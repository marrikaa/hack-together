import { setDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { dbConnection } from './firebaseConfig';
import { uuid } from 'uuidv4';
import { NewConversationType, Message } from '../types/types';


export const createConversation = async (params: NewConversationType): Promise<string> => {
    const currentId = uuid();
    await setDoc(doc(dbConnection, "conversations", currentId), {
        id: currentId,
        messages: params.messageContent,
    });
    return currentId;
}

export const postMessageToConversation = async (conversationId: string, message: Message) => {
    const conversationRef = doc(dbConnection, "conversations", conversationId);
    await updateDoc(conversationRef, {
        messages: arrayUnion(message)
    });
}

