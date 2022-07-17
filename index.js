"use strict";
import express from 'express';
import sequelize from './config/sequelize.js';
import api from './api/index.js';
import { port, secret } from './config/env.js';
import session from 'express-session';
import cors from 'cors';

const app = express();

await sequelize.authenticate();
console.log('Connect to postgresql sucessfully');

// config express session
app.use(session({
    secret: secret,
    resave: false,
    cookie: {
        maxAge: 3600, // 1 hours
    },
    saveUninitialized: true
}))

// config cors
app.use(cors());

// config body parser
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());

// config api
api(app);

// start server
const PORT = port || 4000;
app.listen(PORT, () => {
    console.log('Tiktok api is connecting on PORT ' + PORT)
})
