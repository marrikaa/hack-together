import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Position, Project } from '../../types/types'

type OneProjectProps = {
    title: string,
    description: string,
    positions: Position[]
    currentProject: Project
}

export const OneProject = ({ title, description, positions, currentProject }: OneProjectProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${currentProject.id}`)
    }
    return (
        <div className='project-list-one-project-container' onClick={handleClick}>
            <h2 className='project-card-title'>{title}</h2>
            <p>{description}</p>
            <h3 className='open-positions-title'>Looking for:</h3>
            <div className='one-position-positions-container'>
                {positions.map((position, i) => <label className='one-project-open-position' key={i}>{position.title}</label>)}
            </div>

        </div >
    )
}
