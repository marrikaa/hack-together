import React, { useContext, useState } from 'react'
import { NewProjectPosition } from '../NewProjectPosition/NewProjectPosition';
import { Position, ProjectWithoutId } from '../../types/types';
import { OnePosition } from '../ProjectDetails/OnePosition';
import TextArea from '../TextArea/TextArea';
import { AppContext } from '../../context/AppContext';
import { addProjectToUser, createProjectInDB } from '../../client/client';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css'

const CreateProject = () => {
    const [newPositionPopUpVisible, setNewPositionPopUpVisible] = useState(false);
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentPositions, setCurrentPositions] = useState<Position[]>([]);
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    const saveProject = async () => {
        const projectToCreate: ProjectWithoutId = {
            title: currentTitle,
            description: currentDescription,
            owner: user!.username,
            positions: currentPositions,
        }
        const response = await createProjectInDB(projectToCreate);
        await addProjectToUser(user!.uid, response.projectId);
        navigate(`/project/${response.projectId}`);
    }

    const changeCurrentDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.currentTarget.value);
    }

    const changeCurrentTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value);
    }

    return (
        <div>
            {newPositionPopUpVisible && <NewProjectPosition
                positions={currentPositions}
                setCurrentPositions={setCurrentPositions}
                setVisible={setNewPositionPopUpVisible} />}
            <div className='create-project-header'>
                <h1>Create project</h1>
                <button className="red-button not-important" onClick={saveProject}>Save Project</button>
            </div>
            <h2>Title</h2>
            <input type='text' onChange={changeCurrentTitle} />
            <h2>Description</h2>
            <TextArea canType={true} currentDescription={currentDescription} onTyping={changeCurrentDescription} />
            <div className='add-position-button-div'>
                <h2>Add Position</h2>
                <button className='red-button' onClick={() => setNewPositionPopUpVisible(true)}>+</button>
            </div>
            {currentPositions.map((position, i) =>
                <OnePosition isApplicable={false} position={position} key={i} />
            )}
        </div>
    )
}

export default CreateProject