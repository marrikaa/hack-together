import { collection, query, getDocs, setDoc, doc, where, getDoc } from "firebase/firestore";
import { ProjectWthoutId } from '../types/types';
import { dbConnection } from './firebaseConfig';
import { Project, Application, Position } from '../types/types';
import { addProjectToUserByUserName, getUserById } from './UDbManager'
import { uuid } from 'uuidv4';



export const getAllProjects = async (): Promise<Project[] | undefined> => {
    const projectsRef = collection(dbConnection, "projects");
    const querySnapshot = await getDocs(query(projectsRef));
    const projects = querySnapshot.docs.map(project => project.data());
    return projects as Project[];
}


export const getProjectsById = async (uid: string): Promise<Project> => {
    const projectRef = collection(dbConnection, "projects");
    const q = query(projectRef, where("id", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as Project;
}

export const getUserProjectsById = async (uid: string): Promise<Project[]> => {
    const user = await getUserById(uid);
    const getAllProjects = async () => {
        const projectsArray: Project[] = [];
        for (const project of user.projects) {
            projectsArray.push(await getProjectsById(project));
        }
        return projectsArray;
    }
    return (await getAllProjects());
}

export const createProject = async (params: ProjectWthoutId): Promise<string> => {
    const currentId = uuid();
    params.positions.forEach(position => position.id = uuid());
    await setDoc(doc(dbConnection, "projects", currentId), {
        title: params.title,
        description: params.description,
        positions: params.positions,
        id: currentId,
        owner: params.owner
    });
    return currentId;
}

export const addApplicationToProject = async (projectId: string, positionId: string, application: Application) => {
    const projectRef = doc(dbConnection, "projects", projectId);
    const project = await getDoc(projectRef);
    const projectData = project.data();
    projectData?.positions.filter((position: Position) => positionId === position.id)[0].applications.push(application);
    await setDoc(doc(dbConnection, "projects", projectId), projectData);
}

export const removeApplicationFromProject = async (projectId: string, positionId: string, username: string) => {
    const projectRef = doc(dbConnection, "projects", projectId);
    const project = await getDoc(projectRef);
    const projectData = project.data();
    const positions: Position[] = projectData?.positions;
    const position: Position = positions.filter((currentPosition: Position) => currentPosition.id == positionId)[0];
    position.applications = position.applications.filter((application: Application) =>
        application.username !== username);
    await setDoc(doc(dbConnection, "projects", projectId), projectData);
}

export const fromApplicationtoDevelopers = async (projectId: string, positionId: string, username: string) => {
    const projectRef = doc(dbConnection, "projects", projectId);
    const project = await getDoc(projectRef);
    const projectData = project.data();
    const position = projectData?.positions.filter((position: Position) => positionId === position.id)[0]
    position.developer = username;
    position.applications = [];
    position.fullfilled = true;
    await setDoc(doc(dbConnection, "projects", projectId), projectData);
    await addProjectToUserByUserName(username, projectId);
}

