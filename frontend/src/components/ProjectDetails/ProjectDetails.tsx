import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../../App'
import { getExternalProjectById } from '../../client/client'
import { AppContext } from '../../context/AppContext'
import { Project } from '../../types/types'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
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
    }, [projectId, user])




    return (
        <div className='project-details'>
            {!project && <LoadingSpinner />}
            {project && <>
                {applyPopUpVisible && <ApplyPopUp projectId={projectId} setVisible={setApplyPopUpVisible} selectedPositionId={selectedPosition} />}
                <h1 style={{ fontWeight: 'medium' }}>{project?.title}</h1>
                <h2 className='project-details-project-owner-name'>By {project?.owner}</h2>
                <p className='project-details-description'>{project?.description}</p>
                <h2>Looking for:</h2>
                <div className='positions-container'> {project?.positions.map((position, i) => <OnePosition project={project} setSelectedPosition={setSelectedPosition} isMyProject={isMyProject} applications={position.applications} setApplyPopUpVisible={setApplyPopUpVisible} isApplicable={!isMyProject} projectId={project.id} position={position} key={i} setProject={setProject} />)}</div>
            </>}
        </div>)
}
export default ProjectDetails