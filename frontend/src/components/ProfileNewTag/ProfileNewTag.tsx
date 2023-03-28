import React, { useEffect, useState } from 'react'
import { getExternalTags } from '../../client/client';

type ProfileNewTagProps = {
    setVisible: (bool: boolean) => void;
    setTags: (tags: string[]) => void;
    tags: string[]
}

export const ProfileNewTag = ({ setVisible, setTags, tags }: ProfileNewTagProps) => {

    const [tagsState, setTagsState] = useState<string[]>([]);
    const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>([]);

    const close = () => {
        setVisible(false);
    }

    const save = () => {
        setTags([...tags, ...currentSelectedTags]);
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
                <h1>Add new skills</h1>
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
