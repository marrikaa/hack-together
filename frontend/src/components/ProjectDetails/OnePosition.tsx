import React, { useContext, useEffect, useState } from 'react'
import { Position, Application, Project } from '../../types/types';
import { ApplyPopUp } from './ApplyPopUp';
import { ApplicationCard } from './ApplicationCard';
import { AppContext } from '../../context/AppContext';

type OnePositionProps = {
    project?: Project;
    applications?: Application[];
    isMyProject?: boolean;
    setProject?: (project: Project) => void;
    projectId?: string;
    position: Position;
    isApplicable?: boolean;
    setApplyPopUpVisible?: (bool: boolean) => void;
    setSelectedPosition?: (str: string) => void;
}

export const OnePosition = ({ project, applications, projectId, position, isApplicable, setApplyPopUpVisible, setSelectedPosition, isMyProject, setProject }: OnePositionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(AppContext);
    const [hasApplied, setHasApplied] = useState(false);
    // const [currentApplications, setCurrentApplications] = useState<Application[]>([]);

    useEffect(() => {
        position.applications.forEach(a => {
            if (a.username === user?.username) {
                setHasApplied(true);
            }
        })
    }, [position.applications, user, project])


    const applyHandler = () => {
        setHasApplied(true);
        setApplyPopUpVisible!(true);
        setSelectedPosition!(position.id!);
    }

    const expandOrRetract = () => {
        if (isMyProject) {
            setIsExpanded(!isExpanded)
        }
    }

    return (
        <div className={`position-div project-list-one-project-container ${position.fullfilled ? "fullfilled-div" : "not-fullfilled"}`}>
            <h2 className='position-title'>{position?.title}</h2>
            <p className='position-description'>{position.description}</p>
            {position.skills.map((skill, i) => <div key={i}>{skill}</div>)}
            {!position.fullfilled && isApplicable && !hasApplied &&
                <button onClick={applyHandler} className="apply-button">Apply</button>}
            {position.fullfilled && <h3 className='fullfilled' onClick={applyHandler}>Fullfilled</h3>}
            {
                isMyProject && !position.fullfilled &&
                <label onClick={expandOrRetract} className='see-applicants-label'>See Applicants {applications?.length}</label>
            }
            {
                isExpanded && <div className='applications-container'>
                    {applications?.map(application => <ApplicationCard projectId={projectId!}
                        positionId={position.id!} application={application} project={project!}
                        setProject={setProject!} />)}
                </div>
            }
        </div >
    )
}