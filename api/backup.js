import { Router } from 'express';
import Data from '../data.js';
import Model from '../Model/users.js';
import fs from 'fs';
import Videos from '../Model/videos.js';
import axios from 'axios';
import { server } from '../config/env.js';


const data = JSON.parse(Data);
const router = Router();

router.get('/backup/review', async (req, res) => {
    res.send(data);
})

router.get('/backup/user', async (req, res) => {
    try {
        const userIds = Object.keys(data.authors);
        for (let userId of userIds) {
            const userData = {
                username: data.authors[userId].uniqueIds[0],
                nickname: data.authors[userId].nicknames[0],
                password: 'hoaian-dep-trai',
                descripton: 'test-user-id'
            }
            await axios.post(`${server}/register`, userData);
            res.send('ok');
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/backup/video', async (req, res) => {
    try {
        const VideoIds = Object.keys(data.videos);

        for (let VideoId of VideoIds) {
            try {
                const video = data.videos[VideoId];
                const authorId = data.videos[VideoId].authorId;
                const author = await Model.findOne({
                    where: {
                        username: data.authors[authorId].uniqueIds
                    }
                })
                const file = fs.readFileSync('/home/than/Videos/Test/data/Likes/videos/' + VideoId + '.mp4');
                await Videos.create({
                    description: video.desc,
                    data: file,
                    owner: author.userId
                })
            } catch (err) {
                console.log('failed to updaload video id: ' + VideoId)
            }
        }
        res.send('Updated');
    } catch (err) {
        console.log(err);
        res.send('failed');
    }
})

export default router;
