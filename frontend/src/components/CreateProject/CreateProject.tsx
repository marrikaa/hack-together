import React, { useContext, useState } from 'react'
import { NewProjectPosition } from '../NewProjectPosition/NewProjectPosition';
import { Position, Project, ProjectWithoutId } from '../../types/types';
import { OnePosition } from '../ProjectDetails/OnePosition';
import TextArea from '../TextArea/TextArea';
import { AppContext } from '../../context/AppContext';
import { addProjectToUser, createProjectInDB } from '../../client/client';
import { useNavigate } from 'react-router-dom';

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
        console.log(response);
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
            <h1>Create project</h1>
            <h2>title</h2>
            <input type='text' onChange={changeCurrentTitle} />
            <h2>Description</h2>
            <TextArea canType={true} currentDescription="" onTyping={changeCurrentDescription} />
            {currentPositions.map((position) =>
                <OnePosition isApplicable={false} position={position} />
            )}
            <h2>Add Position</h2>

            <button className='red-button' onClick={() => setNewPositionPopUpVisible(true)}>+</button>
            <button className="save-project-button" onClick={saveProject}>Save Project</button>
        </div>
    )
}

export default CreateProject