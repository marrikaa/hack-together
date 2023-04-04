/* eslint-disable no-console */
import express from "express";
import { getConversationsByUserId, makeMessageRead, postMessageToConversation } from './database/MDbmanager';
import { addApplicationToProject, createProject, fromApplicationtoDevelopers, getAllProjects, getProjectsById, getUserProjectsById, removeApplicationFromProject } from './database/PDbManager';
import { getUserByUserName, login, register, getAllTags, updateUser, addProjectToUser, getAllUsers } from './database/UDbManager';
import { User } from './types/types';


const functions = require('firebase-functions')


const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))


app.post('/api/register', async (req, res) => {
    try {
        if (!(req.body.email && req.body.password && req.body.username)) {
            res.status(400).send({ message: "Body is not correct" });
        }
        const operationMessage = await register(req.body.username, req.body.email, req.body.password);
        if (operationMessage === "success") {
            res.status(201).send({ message: operationMessage });
        }
        else {
            res.status(400).send({ message: operationMessage });
        }
    }
    catch {
        res.status(500).end();
    }
})

app.post('/api/login', async (req, res) => {
    try {
        if (!(req.body.email && req.body.password)) {
            res.status(400).send({ message: "Body is not correct" });
        }
        const user: (User | undefined) = await login(req.body.email, req.body.password);
        res.status(200).send(user);
    } catch (e: any) {
        res.status(500).send({ username: "", uid: e.message });
    }
})

app.get('/api/profile/:username', async (req, res) => {
    try {
        const user = await getUserByUserName(req.params.username);
        res.status(200).send({ ...user, messages: [] })
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.patch('/api/profile/:username', async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Body is not correct" });
        }
        const operationMessage = await updateUser(req.body);
        if (operationMessage === "success") {
            res.status(200).send({ message: operationMessage });
        }
        else {
            res.status(400).send({ message: operationMessage });
        }
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/tags', async (req, res) => {
    try {
        const tags = await getAllTags();
        const stringTags = tags?.map(tag => tag.name);
        res.status(200).send(stringTags);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.status(200).send(projects);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/profile/:userId/projects', async (req, res) => {
    try {
        const projects = await getUserProjectsById(req.params.userId);
        if (projects) {
            res.status(200).send(projects);
        }
        else {
            res.status(404).end();
        }
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.post('/api/profile/:userId/projects', async (req, res) => {
    try {
        await addProjectToUser(req.params.userId, req.body.projectId);
        res.status(201).send("created");
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/project/:uid', async (req, res) => {
    try {
        const project = await getProjectsById(req.params.uid);
        res.status(200).send(project);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.post('/api/project/:uid/:positionId', async (req, res) => {
    try {
        const project = await addApplicationToProject(req.params.uid, req.params.positionId, req.body);
        res.status(200).send(project);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.delete('/api/project/:uid/:positionId', async (req, res) => {
    try {
        await removeApplicationFromProject(req.params.uid, req.params.positionId, req.body.username);
        res.status(204).send({ message: "deleted" });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.patch('/api/project/:uid/:positionId', async (req, res) => {
    try {
        await fromApplicationtoDevelopers(req.params.uid, req.params.positionId, req.body);
        res.status(200).send({});
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.post('/api/project', async (req, res) => {
    try {
        if (!(req.body.title && req.body.description && req.body.positions && req.body.description && req.body.owner)) {
            res.status(400).send({ message: "Body is not correct" });
        }
        const projectId = await createProject(req.body);
        res.status(201).send({ projectId: projectId });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.post('/api/messages/:receiverUsername', async (req, res) => {
    try {
        if (!(req.body.senderUsername && req.body.messageContent)) {
            res.status(400).send({ message: "Body is not correct" });
        }
        await postMessageToConversation(req.body, req.params.receiverUsername);
        res.status(201).send({ message: "posted successfully" });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/messages/:userId', async (req, res) => {
    try {
        const response = await getConversationsByUserId(req.params.userId);
        res.status(201).send(response);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

// app.post('/api/profile/:userId/image', async (req, res) => {

//     try {
//         //const file = Buffer.from(req.body).toString('base64');
//         await uploadImageAndSetUserImage(req.params.userId, req.body);
//         res.status(201).send({ message: "posted successfully" });
//     } catch (e: any) {
//         res.status(500).send({ message: e.message });
//     }
// })

app.patch('/api/conversation/:convoId', async (req, res) => {
    try {
        await makeMessageRead(req.params.convoId, req.body.username);
        res.status(204).send({ message: "update successfully" });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})
exports.app = functions.https.onRequest(app);
