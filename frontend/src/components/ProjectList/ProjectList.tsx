import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExternalProjects, getUserExternalProjects } from '../../client/client'
import { AppContext } from '../../context/AppContext'
import { Project } from '../../types/types'
import { OneProject } from './OneProject'
import './ProjectList.css'

const ProjectList = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [userProjects, setUserProjects] = useState<string[]>([]);
    const { user } = useContext(AppContext);
    const [showMyProjects, setShowMyProjects] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            const projs = await getExternalProjects();
            setProjects(projs);
        }

        getProjects();
        const getUserProjects = async () => {
            if (user && projects) {
                const projects = await getUserExternalProjects(user!.uid);
                const stringProjects = projects.map((project: Project) => project.id);
                setUserProjects(stringProjects);
            }
        }
        getProjects();
        getUserProjects();
    }, [user]);

    return (
        <div>
            {user?.username && projects && <>
                <h1>Projects</h1>
                <div className='project-list-button-container'>
                    <div className='flex'>
                        {user && <button className={`red-button myprojects-button ${showMyProjects ? 'selected '
                            : ''}`} onClick={() => setShowMyProjects(true)}>My projects</button>}
                        <button className={`red-button allprojects-button ${!showMyProjects ? 'selected '
                            : ''}`} onClick={() => setShowMyProjects(false)}>All projects</button>
                    </div>
                    <button className="red-button not-important" onClick={() => navigate('/createproject')}>Create project</button>
                </div>
            </>}
            {projects &&
                !showMyProjects && projects.map((project, i) =>
                    <OneProject title={project.title}
                        key={i} description={project.description}
                        currentProject={project}
                        positions={project.positions} />)
            }
            {
                userProjects && user && projects && showMyProjects && projects.filter(project =>
                    userProjects.includes(project.id)).map((project, i) => {
                        return (<OneProject title={project.title} key={i}
                            description={project.description} currentProject={project}
                            positions={project.positions} />)
                    }
                    )}
        </div >
    )
}

export default ProjectList
