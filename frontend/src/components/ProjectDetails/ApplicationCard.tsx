import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { acceptDeveloper, addMessagesInConversations, rejectDeveloper } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { Application, Project } from '../../types/types';
import './ProjectDetails.css'

type ApplicationCardProps = {
    projectId: string;
    positionId: string;
    application: Application,
    project: Project,
    setProject: (project: Project) => void;
}

export const ApplicationCard = ({ projectId, positionId, application, project, setProject }: ApplicationCardProps) => {
    const { user } = useContext(AppContext);
    const setPositionFullfilled = () => {
        const tempProject = project;
        tempProject.positions.forEach(p => {
            if (p.id === positionId) {
                p.fullfilled = true;
            }
        })
        setProject({ ...tempProject });
    }

    const acceptedUserMesaages = async () => {
        let position = project.positions.filter(p => p.id === positionId)[0];
        await addMessagesInConversations({
            senderUsername: user!.username,
            messageContent: `Congratulations, You are accepted for the position ${position.title} in the project ${project.title}`,
        }, application.username)
    }

    const rejectedUserMesaages = async () => {
        let position = project.positions.filter(p => p.id === positionId)[0];
        await addMessagesInConversations({
            senderUsername: user!.username,
            messageContent: `Sorry, You are rejected for the position ${position.title} in the project ${project.title}`,
        }, application.username)
    }

    const accept = () => {
        acceptedUserMesaages();
        acceptDeveloper(projectId, positionId, application.username);
        eliminateAll();
        setPositionFullfilled();
    }

    const reject = () => {
        rejectedUserMesaages();
        rejectDeveloper(projectId, positionId, application.username);
        eliminateSelf();
    }

    const eliminateSelf = () => {
        const tempProject = project;
        tempProject.positions.forEach(p => {
            if (p.id === positionId) {
                p.applications = p.applications.filter(a => a.username !== application.username);
            }
        })
        setProject({ ...tempProject });
    }

    const eliminateAll = () => {
        const tempProject = project;
        tempProject.positions.forEach(p => {
            if (p.id === positionId) {
                p.applications = [];
            }
        })
        setProject({ ...tempProject });
    }

    return (
        <div className='application-card'>
            <div>
                <Link to={`/profile/${application.username}`} className='application-card-username'><h1 style={{ fontWeight: 'medium' }}>{application.username}</h1></Link>
                <p>{application.message}</p>
            </div>
            <div className='button-container'>
                <button className='red-button accept-application' onClick={accept}>Accept</button>
                <button className='red-button not-important' onClick={reject}>Reject</button>
            </div>
        </div >
    )
}
