import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getExternalProjectById } from '../../client/client'
import { Project } from '../../types/types'
import { OnePosition } from './OnePosition'
import './ProjectDetails.css'

const ProjectDetails = () => {
    const { projectId } = useParams();

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        const getProject = async () => {
            const requestedProject = await getExternalProjectById(projectId!);
            setProject(requestedProject);
        }
        getProject();
    }, [])


    return (
        <div className='project-details'>
            <h1>{project?.title}</h1>
            <h2>By {project?.owner}</h2>
            <p>{project?.description}</p>
            <div className='positions-container'> {project?.positions.map((position, i) => <OnePosition position={position} key={i} />)}</div>
        </div>)
}
export default ProjectDetails