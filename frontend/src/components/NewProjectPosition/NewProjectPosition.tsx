import React, { useEffect, useRef, useState } from 'react'
import { getExternalTags } from '../../client/client';
import { Position } from '../../types/types';
import './NewProjectPosition.css';
import TextArea from '../TextArea/TextArea';



type NewProjectPositionProps = {
    setVisible: (bool: boolean) => void;
    setCurrentPositions: (positions: Position[]) => void;
    positions: Position[];
}

export const NewProjectPosition = ({ setVisible, positions, setCurrentPositions }: NewProjectPositionProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [currentDescription, setCurrentDescription] = useState("");
    const [tagsState, setTagsState] = useState<string[]>([]);
    const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>([]);

    const close = () => {
        setVisible(false);
    }

    const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.currentTarget.value);
    }

    const save = () => {
        const newPosition: Position = {
            title: titleRef.current!.value,
            description: currentDescription,
            skills: currentSelectedTags,
            fullfilled: false,
            developer: { username: '' },
            applications: []
        }
        const tempPositions = [...positions];
        tempPositions.push(newPosition);
        setCurrentPositions(tempPositions);
        setVisible(false);
    }
    useEffect(() => {
        const getTags = async () => {
            const tags = await getExternalTags();
            setTagsState(tags);
        }
        getTags();
    }, [])

    const addTag = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        if (!currentSelectedTags.includes(event.currentTarget.value)) {
            setCurrentSelectedTags([...currentSelectedTags, event.currentTarget.value])
        }
        selectRef.current!.value = "default";
    }

    const removeTag = (index: number) => {
        const tempTags = [...currentSelectedTags];
        tempTags.splice(index, 1);
        setCurrentSelectedTags(tempTags);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up new-position'>
                <h1>Add new position</h1>
                <label>Title</label>
                <input ref={titleRef} />
                <label>Description</label>
                <TextArea canType={true} currentDescription={currentDescription} onTyping={setDescription} />
                <label>Add tech</label>
                <select onChange={addTag} ref={selectRef} className='pop-up-select'>
                    <option selected disabled value="default"></option>
                    {tagsState.map((tag, i) => <option key={i} value={tag} >{tag}</option>)}
                </select>
                <div className='add-tag-list'>
                    {currentSelectedTags.map((tag, i) => {
                        return <div className='add-tag-list-container'>{tag}<button key={i} onClick={() => removeTag(i)}>x</button></div>
                    })}
                </div>
                <div className='pop-up-button-container'>
                    <button className='red-button not-important' onClick={close}>Exit</button>
                    <button className='red-button' onClick={save}>Save</button>
                </div>
            </div>
        </div >
    )
}
