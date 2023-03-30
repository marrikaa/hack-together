import React, { useEffect, useRef, useState } from 'react'
import { getExternalTags } from '../../client/client';
import { Position } from '../../types/types';
import { uuid } from 'uuidv4';



type NewProjectPositionProps = {
    setVisible: (bool: boolean) => void;
    setCurrentPositions: (positions: Position[]) => void;
    positions: Position[];
}

export const NewProjectPosition = ({ setVisible, positions, setCurrentPositions }: NewProjectPositionProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const [tagsState, setTagsState] = useState<string[]>([]);
    const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>([]);

    const close = () => {
        setVisible(false);
    }

    const save = () => {
        const newPosition: Position = {
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            skills: currentSelectedTags,
            fullfilled: false,
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
    }

    const removeTag = (index: number) => {
        const tempTags = [...currentSelectedTags];
        tempTags.splice(index, 1);
        setCurrentSelectedTags(tempTags);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up'>
                <h1>Add new position</h1>
                <label>title</label>
                <input ref={titleRef} />
                <label>description</label>
                <input ref={descriptionRef} />
                <select onChange={addTag}>
                    <option selected disabled></option>
                    {tagsState.map((tag, i) => <option key={i} value={tag} >{tag}</option>)}
                </select>
                <ul>
                    {currentSelectedTags.map((tag, i) => {
                        return <li>{tag}<button key={i} onClick={() => removeTag(i)}>x</button></li>
                    })}
                </ul>
                <div className='pop-up-button-container'>
                    <button className='red-button' onClick={close}>Exit</button>
                    <button className='red-button' onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}
