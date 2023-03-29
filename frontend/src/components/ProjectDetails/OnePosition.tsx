import React from 'react'
import { Position } from '../../types/types';

type OnePositionProps = {
    position: Position;
}

const applieHandler = () => {

}
export const OnePosition = ({ position }: OnePositionProps) => {
    return (
        <div className={`position-div project-list-one-project-container ${position.fullfilled ? "fullfilled-div" : "not-fullfilled"}`}>
            <h2 className='position-title'>{position?.title}</h2>
            <p className='position-description'>{position.description}</p>
            {position.skills.map((skill, i) => <div key={i}>{skill}</div>)}
            {!position.fullfilled && <button onClick={applieHandler} className="apply-button">Apply</button>}
            {position.fullfilled && <h3 className='fullfilled' onClick={applieHandler}>Fullfilled</h3>}
        </div>
    )
}