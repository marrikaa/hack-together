import { useEffect, useRef, useState } from "react";

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
            <label htmlFor="review-text">Review:</label>
            <textarea
                id="review-text"
                onChange={handleChange}
                defaultValue={currentDescription}
                readOnly={!canType}
                ref={textAreaRef}
                rows={1}
                className={'profile-description'}
            />
        </div>
    );
}

export default TextArea;