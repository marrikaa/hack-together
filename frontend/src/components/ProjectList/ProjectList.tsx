import React, { useEffect, useState } from 'react'
import { getExternalProjects } from '../../client/client'
import { Project } from '../../types/types'
import { OneProject } from './OneProject'
import './ProjectList.css'

export const ProjectList = () => {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const getProjects = async () => {
            const projs = await getExternalProjects();
            setProjects(projs);

        }
        getProjects()
    }, [])

    return (
        <div>
            <h1>Projects</h1>
            {projects.map((project, i) => <OneProject title={project.title} key={i} description={project.description} currentProject={project} positions={project.positions} />)}
        </div>
    )
}
