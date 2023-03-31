import { useRef, useState } from "react";

import useAutosizeTextArea from "./useAutosizeTextArea";

import "./TextArea.css";

type PropsForTextArea = {
    canType: boolean;
    currentDescription: string;
    onTyping: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ canType, currentDescription, onTyping }: PropsForTextArea) => {
    const [value, setValue] = useState(currentDescription);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        onTyping(evt);
        const val = evt.target?.value;
        setValue(val);
    };

    return (
        <div className="text-area-app">
            <textarea
                id="review-text"
                onChange={handleChange}
                value={currentDescription}
                readOnly={!canType}
                ref={textAreaRef}
                rows={1}
                className={'profile-description'}
                style={{ 'border': canType ? '.5px solid black' : 'none' }}
            />
        </div>
    );
}

export default TextArea;