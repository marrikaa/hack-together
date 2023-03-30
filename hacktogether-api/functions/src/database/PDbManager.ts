import { collection, query, getDocs, setDoc, doc, where } from "firebase/firestore";
import { ProjectWthoutId } from '../types/types';
import { dbConnection } from './firebaseConfig';
import { Project } from '../types/types';
import { getUserById } from './UDbManager'
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
    await setDoc(doc(dbConnection, "projects", currentId), {
        title: params.title,
        description: params.description,
        positions: params.positions,
        id: currentId,
        owner: params.owner
    });
    return currentId;
}






