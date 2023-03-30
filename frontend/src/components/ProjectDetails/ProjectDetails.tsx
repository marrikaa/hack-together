import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../../App'
import { getExternalProjectById } from '../../client/client'
import { AppContext } from '../../context/AppContext'
import { Project } from '../../types/types'
import { OnePosition } from './OnePosition'
import './ProjectDetails.css'

const ProjectDetails = () => {
    const { projectId } = useParams();
    const { user } = useContext(AppContext);
    const [isMyProject, setIsMyProject] = useState(false);

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        const getProject = async () => {
            const requestedProject = await getExternalProjectById(projectId!);
            if (requestedProject.owner === user?.username) {
                setIsMyProject(true);
            }
            setProject(requestedProject);
        }
        getProject();
    }, [])


    return (
        <div className='project-details'>
            <h1>{project?.title}</h1>
            <h2>By {project?.owner}</h2>
            <p>{project?.description}</p>
            <div className='positions-container'> {project?.positions.map((position, i) => <OnePosition isApplicable={!isMyProject} position={position} key={i} />)}</div>
        </div>)
}
export default ProjectDetails