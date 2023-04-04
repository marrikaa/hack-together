import React, { useContext, useEffect, useState } from 'react';
import { Message } from '../../types/types';
import { AppContext } from '../../context/AppContext';
import './Conversation.css'

type MessageProps = {
    message: Message,
}

export const OneMessage = ({ message }: MessageProps) => {

    const { user } = useContext(AppContext);
    const [myUser, setMyUser] = useState<boolean>(false);

    useEffect(() => {
        if (message.senderUsername === user?.username) {
            setMyUser(true);
        }
    }, []
    )

    return (<div className={myUser ? 'whole-message sender' : 'whole-message receiver'}>
        <h4 className='user-name'>
            {myUser ? 'You' : message.senderUsername}</h4>
        <div className='message-body'>
            <p style={{ fontWeight: !message.read ? 'bold' : 'regular' }}>{message.messageContent}</p>
        </div>
    </div>
    )
}
