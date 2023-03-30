import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../../App'
import { getExternalProjectById } from '../../client/client'
import { AppContext } from '../../context/AppContext'
import { Project } from '../../types/types'
import { ApplyPopUp } from './ApplyPopUp'
import { OnePosition } from './OnePosition'
import './ProjectDetails.css'

const ProjectDetails = () => {
    const { projectId } = useParams();
    const { user } = useContext(AppContext);
    const [isMyProject, setIsMyProject] = useState(false);
    const [applyPopUpVisible, setApplyPopUpVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState("");

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
    }, [projectId])


    return (
        <div className='project-details'>
            {applyPopUpVisible && <ApplyPopUp projectId={projectId} setVisible={setApplyPopUpVisible} selectedPositionId={selectedPosition} />}
            <h1>{project?.title}</h1>
            <h2>By {project?.owner}</h2>
            <p>{project?.description}</p>
            <div className='positions-container'> {project?.positions.map((position, i) => <OnePosition setSelectedPosition={setSelectedPosition} isMyProject={isMyProject} applications={position.applications} setApplyPopUpVisible={setApplyPopUpVisible} isApplicable={!isMyProject} projectId={project.id} position={position} key={i} />)}</div>
        </div>)
}
export default ProjectDetails