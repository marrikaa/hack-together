import React, { useContext, useState } from 'react'
import { addApplicationToPosition } from '../../client/client';
import { AppContext } from '../../context/AppContext';


type ApplyPopUp = {
    setVisible: (bool: boolean) => void;
    selectedPositionId: string;
    projectId?: string;
}

export const ApplyPopUp = ({ setVisible, selectedPositionId, projectId }: ApplyPopUp) => {

    const { user } = useContext(AppContext);
    const [currentMessage, setCurrentMessage] = useState("");


    const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.currentTarget.value);
    }

    const close = () => {
        setVisible(false);
    }

    const submit = () => {
        addApplicationToPosition(projectId!, selectedPositionId, { username: user!.username, message: currentMessage });
        setVisible(false);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up'>
                <h1>Do you want to send a message to the project owner?</h1>
                <input type='text' onChange={changeMessage} />
                <div className='pop-up-button-container'>
                    <button className='red-button' onClick={close}>Exit</button>
                    <button className='red-button' onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
