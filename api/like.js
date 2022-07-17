import Router from 'express';
import Likes from '../Model/likes.js';
import Users from '../Model/users.js';
import Images from '../Model/images.js';

const router = Router();

router.post('/like/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { userId: owner } = req.user;
        const like = await Likes.create({
            videoId, owner
        });
        res.send(like);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/like/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { userId } = req.user;
        const like = await Likes.findOne({
            where: { videoId, owner: userId }
        });
        res.send(like);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/likes/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { userId: owner } = req.user;
        const likes = await Likes.findAll({
            where: { videoId, owner },
            include: [
                { model: Users, include: [{ model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] } }] },
            ]
        })
        res.send(likes);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.delete('/like/video/:videoId', async (req, res) => {
    try {
        const { userId: owner } = req.user;
        const { videoId } = req.params;
        const deleted = await Likes.destroy({
            where: {
                owner, videoId
            }
        })
        if (!deleted) throw 'failed';
        res.send('deleted');
    } catch (err) {
        res.sendStatus(400);
    }
})

export default router;
