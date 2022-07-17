import { Router } from 'express';
import upload from '../config/multer.js';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import Videos from '../Model/videos.js';
import Likes from '../Model/likes.js';
import Users from '../Model/users.js';
import Images from '../Model/images.js';

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
                include: [[Sequelize.fn('count', 'likes.likeId'), 'likeCount']],
                exclude: ['data']
            },
            include: [
                { model: Likes, foreignKey: 'videoId', attributes: [] },
                { model: Users, foreignKey: 'owner', attributes: { exclude: ['password'] }, include: [{ model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] } }] }
            ],
            group: ['videos.videoId', 'likes.likeId', 'user.userId', 'user->image.imageId']
        });
        res.send(video);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.delete('/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { userId } = req.user;
        if (!userId) throw 'failed';
        const video = await Videos.destroy({
            where: {
                videoId, owner: userId
            }
        })
        if (!video) throw 'failed';
        res.end('deleted')
    } catch (err) {
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
                {
                    model: Videos, attributes: { exclude: ['data'] },
                    include: [{ model: Users, foreignKey: 'owner', attributes: { exclude: ['password'] } }],
                }
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
                include: [[Sequelize.fn('count', 'likes.likeId'), 'likeCount']],
                exclude: ['data']
            },
            include: [
                { model: Likes, foreignKey: 'videoId', attributes: [] },
                { model: Users, foreignKey: 'owner', attributes: { exclude: ['password'] }, include: [{ model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] } }] }
            ],
            group: ['videos.videoId', 'likes.likeId', 'user.userId', 'user->image.imageId']
        })
        res.send(videos);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})


export default router;
