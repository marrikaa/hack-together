import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
            <div className='flex'>
                {positions.map((position, i) => <label key={i} className='position-title'>{position.title}</label>)}
            </div>

        </div >
    )
}
