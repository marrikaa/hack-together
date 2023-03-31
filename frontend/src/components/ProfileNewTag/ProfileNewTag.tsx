import React, { useEffect, useRef, useState } from 'react'
import { getExternalTags } from '../../client/client';

type ProfileNewTagProps = {
    setVisible: (bool: boolean) => void;
    setTags: (tags: string[]) => void;
    tags: string[]
}

export const ProfileNewTag = ({ setVisible, setTags, tags }: ProfileNewTagProps) => {

    const [tagsState, setTagsState] = useState<string[]>([]);
    const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>([]);
    const selectRef = useRef<HTMLSelectElement>(null);

    const close = () => {
        setVisible(false);
    }

    const save = () => {
        const nonRepeatedTags = currentSelectedTags.filter(tag => !tags.includes(tag));
        setTags([...tags, ...nonRepeatedTags]);
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
            <div className='pop-up'>
                <h1>Add new skills</h1>
                <select onChange={addTag} ref={selectRef} className='pop-up-select'>
                    <option selected disabled></option>
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
        </div>
    )
}
