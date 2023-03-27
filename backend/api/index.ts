/* eslint-disable no-console */
import express from "express";
import fetch from "node-fetch-commonjs";
import { getUserByUserName, login, register } from '../firebase/dbManager';
import { User } from '../types/types';


const app = express();
const port = 3001;

app.use(express.json());

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
            res.status(200).send({ message: operationMessage });
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
        res.status(500).send({ message: e.message });
    }
})

app.get('/api/profile/:username', async (req, res) => {
    const user = await getUserByUserName(req.params.username);
    res.status(200).send({ ...user, messages: [] })
})

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);