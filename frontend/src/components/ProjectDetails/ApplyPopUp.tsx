import React, { useContext, useState } from 'react'
import { addApplicationToPosition } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import TextArea from '../TextArea/TextArea';
import './ProjectDetails.css'

type ApplyPopUpProps = {
    setVisible: (bool: boolean) => void;
    selectedPositionId: string;
    projectId?: string;
}

export const ApplyPopUp = ({ setVisible, selectedPositionId, projectId }: ApplyPopUpProps) => {
    const { user } = useContext(AppContext);
    const [currentMessage, setCurrentMessage] = useState("");

    const close = () => {
        setVisible(false);
    }

    const submit = () => {
        addApplicationToPosition(projectId!, selectedPositionId, { username: user!.username, message: currentMessage });
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
