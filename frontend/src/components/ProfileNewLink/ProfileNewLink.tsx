import React, { useEffect, useRef, useState } from 'react'
import { getExternalTags } from '../../client/client';
import { LinkType } from '../../types/types';

type ProfileNewLinkProps = {
    setVisible: (bool: boolean) => void;
    setLinks: (Links: LinkType[]) => void;
    links: LinkType[];
}

export const ProfileNewLink = ({ setVisible, setLinks, links }: ProfileNewLinkProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);

    const close = () => {
        setVisible(false);
    }

    const addHTTPS = (str: string): string => {
        const newName = valueRef.current!.value.startsWith('https://') ? valueRef.current!.value
            : 'https://' + nameRef.current!.value;
        return newName;
    }

    const save = () => {
        const newLink: LinkType = {
            name: nameRef.current!.value,
            value: addHTTPS(valueRef.current!.value)
        }
        setLinks([...links, newLink]);
        setVisible(false);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up'>
                <h1>Add new link</h1>
                <label>name</label>
                <input ref={nameRef} />
                <label>value</label>
                <input ref={valueRef} />
                <div className='pop-up-button-container'>
                    <button className='red-button not-important' onClick={close}>Exit</button>
                    <button className='red-button' onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}
