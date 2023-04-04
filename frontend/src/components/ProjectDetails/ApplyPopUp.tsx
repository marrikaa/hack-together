import React, { useContext, useState } from 'react'
import { addApplicationToPosition, addMessagesInConversations, addProjectToUser } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import TextArea from '../TextArea/TextArea';
import './ProjectDetails.css'
import { Project } from '../../types/types';

type ApplyPopUpProps = {
    setVisible: (bool: boolean) => void;
    selectedPositionId: string;
    project: Project;
}

export const ApplyPopUp = ({ setVisible, selectedPositionId, project }: ApplyPopUpProps) => {
    const { user } = useContext(AppContext);
    const [currentMessage, setCurrentMessage] = useState("");

    const close = () => {
        setVisible(false);
    }

    const acceptedUserMessages = async () => {
        const position = project.positions.filter(p => p.id === selectedPositionId)[0];
        await addMessagesInConversations({
            senderUsername: user!.username,
            messageContent: `(${user!.username} wants to apply for the position ${position.title} in your project ${project.title}) Message : ${currentMessage}`,
        }, project.owner)
    }

    const addProjectToUserLocal = async () => {
        await addProjectToUser(user!.uid, project.id);
    }

    const submit = () => {
        addApplicationToPosition(project.id!, selectedPositionId, { username: user!.username, message: currentMessage });
        addProjectToUserLocal();
        acceptedUserMessages();
        setVisible(false);
    }
    const changeCurrentMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMessage(e.currentTarget.value);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up apply'>
                <h1 className='suggestion-text'>Do you want to send a message to the project owner?</h1>
                <TextArea canType={true} currentDescription={currentMessage} onTyping={changeCurrentMessage} />
                <div className='pop-up-button-container'>
                    <button className='red-button exitApplic-button' onClick={close}>Exit</button>
                    <button className='red-button' onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
