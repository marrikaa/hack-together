import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addMessagesInConversations, setConversationRead } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { ConversationType } from '../../types/types';
import TextArea from '../TextArea/TextArea';
import { OneMessage } from './OneMessage';
import './Conversation.css'


const sendIcon = require('../../assets/images/send.png');

export const Conversation = () => {
    const bottomRef = useRef<HTMLDivElement>(null);

    const [currentMessage, setCurrentMessage] = useState("");
    const [justLoaded, setJustLoaded] = useState(true)
    const { conversations, user } = useContext(AppContext);
    const { receiverUsername } = useParams();
    const [currentConversation, setCurrentConversation] = useState<ConversationType>(null);

    const setCurrent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMessage(e.currentTarget.value);
    }

    const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentConversation && user && currentMessage.trim().length !== 0) {
            const message = {
                senderUsername: user.username,
                messageContent: currentMessage

            }
            addMessagesInConversations(message, receiverUsername!)
            const messages = currentConversation.messages;
            messages.push(message);
            setCurrentConversation({ ...currentConversation, messages: messages });
            setCurrentMessage('');
        }
    }

    useEffect(() => {
        const conversation = conversations.filter(c => c!.person1 === receiverUsername || c!.person2 === receiverUsername)[0];
        if (conversation) {
            const previousLength = currentConversation?.messages.length;
            setCurrentConversation(conversation);
            if (conversation.messages.length !== previousLength) {
                setTimeout(() => {
                    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
                setConversationRead(conversation.conversationId!, user?.username!);
            }
        }
        else {
            if (user) {
                setCurrentConversation({
                    person1: user!.username,
                    person2: receiverUsername!,
                    messages: [],
                })
            }
        }

    }, [user, conversations, receiverUsername])

    useEffect(() => {
        if (justLoaded && currentConversation) {
            bottomRef.current!.scrollIntoView({ behavior: 'smooth' });
            setJustLoaded(false);
        }
    }, [currentConversation]);

    return (
        <div className='conversation-container'>
            <h2>{receiverUsername}</h2>
            <div className='conversation-messages-container' >
                {currentConversation?.messages.map((message) => {
                    return <OneMessage message={message} />
                })}
                <div className='bottom-div' ref={bottomRef}></div>
            </div>
            {currentConversation && <>
                <div className='conversation-new-message-div'>
                    <form onSubmit={submitMessage} className='message-send-form'>
                        <textarea name="body" onChange={setCurrent} value={currentMessage} />
                        {currentMessage.trim().length !== 0 &&
                            <button type='submit' className="submit"><img className='send-image' src={sendIcon} alt='send' /></button>}
                    </form>
                </div>
            </>
            }
        </div>
    )
}