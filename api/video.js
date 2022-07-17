import { Router } from 'express';
import upload from '../config/multer.js';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import Videos from '../Model/videos.js';
import Likes from '../Model/likes.js';

dotenv.config();

const router = Router();

router.post('/video', upload.single('file'), async (req, res) => {
    try {
        const { userId: owner } = req.user;
        const { description } = req.body;
        const file = req.file;
        const video = await Videos.create({
            owner, data: file.buffer, description
        })
        delete video.dataValues.data;
        res.send(video);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

router.get('/video/:videoId/view', async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Videos.findByPk(videoId, { attributes: ['data'] });
        const data = Buffer.from(video.data, 'base64');
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
        })
        res.end(data);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Videos.findByPk(videoId, {
            attributes: {
                include: ['videoId', 'url', 'description', 'owner', [Sequelize.fn('count', 'likes.likeId'), 'likeCount']],
            },
            include: [{ model: Likes, foreignKey: 'videoId' }],
            group: ['videos.videoId', 'likes.likeId']
        });
        res.send(video);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/videos/like', async (req, res) => {// update
    try {
        const { userId: owner } = req.user;
        if (!owner) throw 'failed';
        const videos = await Likes.findAll({
            where: { owner },
            attributes: [],
            include: [
                { model: Videos, attributes: { exclude: ['data'] } }
            ]
        })
        res.send(videos);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})


router.get('/videos', async (req, res) => {
    try {
        const { userId: owner } = req.user;
        const videos = await Videos.findAll({
            where: { owner },
            attributes: {
                exclude: ['data']
            }
        })
        res.send(videos);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})


export default router;
