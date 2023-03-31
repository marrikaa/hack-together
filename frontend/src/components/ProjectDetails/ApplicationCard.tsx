import React from 'react';
import { Link } from 'react-router-dom';
import { acceptDeveloper, rejectDeveloper } from '../../client/client';
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

    const setPositionFullfilled = () => {
        const tempProject = project;
        let position = project.positions.filter(p => p.id = positionId)[0];
        position.fullfilled = true;
        setProject({ ...tempProject });
    }
    const accept = () => {
        acceptDeveloper(projectId, positionId, application.username);
        eliminateAll();
        setPositionFullfilled();
    }

    const reject = () => {
        rejectDeveloper(projectId, positionId, application.username);
        eliminateSelf();
    }

    const eliminateSelf = () => {
        const tempProject = project;
        let position = project.positions.filter(p => p.id = positionId)[0];
        console.log(position);
        position.applications = position.applications.filter(a => {
            console.log(`${a.username} || ${application.username} || ${a.username !== application.username}`);
            return a.username !== application.username;
        })
        console.log(tempProject);
        setProject({ ...tempProject });
    }

    const eliminateAll = () => {
        const tempProject = project;
        project.positions.filter(p => p.id = positionId)[0].applications = [];
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
