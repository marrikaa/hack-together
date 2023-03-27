/* eslint-disable no-console */
import express from "express";
import fetch from "node-fetch-commonjs";


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

app.post('/api/register')

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);