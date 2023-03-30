import React from 'react';
import { Link } from 'react-router-dom';
import { acceptDeveloper, rejectDeveloper } from '../../client/client';
import { Application, Project } from '../../types/types';

type ApplicationCardProps = {
    projectId: string;
    positionId: string;
    application: Application,
    project: Project,
    setProject: (project: Project) => void;
}

export const ApplicationCard = ({ projectId, positionId, application, project, setProject }: ApplicationCardProps) => {

    const accept = () => {
        acceptDeveloper(projectId, positionId, application.username);
        eliminateAll();
    }

    const reject = () => {
        rejectDeveloper(projectId, positionId, application.username);
        eliminateSelf();
    }

    const eliminateSelf = () => {
        const tempProject = project;
        let position = project.positions.filter(p => p.id = positionId)[0];
        position.applications = position.applications.filter(a =>
            a.username !== application.username);
        setProject({ ...tempProject });
    }

    const eliminateAll = () => {
        const tempProject = project;
        project.positions.filter(p => p.id = positionId)[0].applications = [];
        console.log(tempProject);
        setProject({ ...tempProject });
    }

    return (
        <div className='application-card'>
            <div>
                <Link to={`/profile/${application.username}`} ><h1 style={{ fontWeight: 'medium' }}>{application.username}</h1></Link>
                <p>{application.message}</p>
            </div>
            <div className='button-container'>
                <button className='red-button' onClick={accept}>Accept</button>
                <button className='red-button' onClick={reject}>Reject</button>
            </div>
        </div >
    )
}
