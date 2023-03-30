import React, { useState } from 'react'
import { Position } from '../../types/types';
import { ApplyPopUp } from './ApplyPopUp';

type OnePositionProps = {
    applications?: {
        message: string,
        username: string
    }[];
    isMyProject?: boolean
    projectId?: string;
    position: Position;
    isApplicable: boolean;
    setApplyPopUpVisible?: (bool: boolean) => void;
    setSelectedPosition?: (str: string) => void;
}

export const OnePosition = ({ applications, projectId, position, isApplicable, setApplyPopUpVisible, setSelectedPosition }: OnePositionProps) => {
    const applyHandler = () => {
        setApplyPopUpVisible!(true);
        setSelectedPosition!(position.id!);
    }
    return (
        <div className={`position-div project-list-one-project-container ${position.fullfilled ? "fullfilled-div" : "not-fullfilled"}`}>
            <h2 className='position-title'>{position?.title}</h2>
            <p className='position-description'>{position.description}</p>
            {position.skills.map((skill, i) => <div key={i}>{skill}</div>)}
            {!position.fullfilled && isApplicable &&
                <button onClick={applyHandler} className="apply-button">Apply</button>}
            {position.fullfilled && <h3 className='fullfilled' onClick={applyHandler}>Fullfilled</h3>}
        </div>
    )
}