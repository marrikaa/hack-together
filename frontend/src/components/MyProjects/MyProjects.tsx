import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserExternalProjects } from '../../client/client';
import { AppContext } from '../../context/AppContext'
import { Project } from '../../types/types';
import { OneProject } from '../ProjectList/OneProject';
import './MyProjects.css'

const MyProjects = () => {

    const { user } = useContext(AppContext);
    const [userProjects, setUserProjects] = useState<Project[]>()
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            const projects = await getUserExternalProjects(user!.uid);
            setUserProjects(projects);
        }
        getProjects();
    }, [])

    return (
        <div>
            <div className='myProject-header'>
                <h1>My Projects</h1>
                <button className="create-project-button" onClick={() => navigate('/createproject')}>Create project</button>
            </div>
            {userProjects &&
                <>
                    {userProjects?.map((project, i) => <OneProject title={project.title} key={i} description={project.description} currentProject={project} positions={project.positions} />)}
                </>}
        </div >
    )
}

export default MyProjects;