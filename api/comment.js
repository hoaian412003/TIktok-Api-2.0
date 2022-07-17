import { Router } from 'express';
import Comments from '../Model/comments.js';
import Users from '../Model/users.js';
import Images from '../Model/images.js';
const router = Router();

router.post('/comment/video/:videoId', async (req, res) => {
    try {
        const { parent, text } = req.body;
        const { videoId } = req.params;
        const { userId: owner } = req.user;
        const comment = await Comments.create({
            parent: parent || null, text, videoId, owner
        })
        res.send(comment);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comments.findByPk(commentId, {
            include: [{
                model: Users, foreignKey: 'owner', attributes: { exclude: ['password'] }, include: [{ model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] } }]
            }]
        });
        res.send(comment);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/comments/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { parent } = req.query;
        const comments = await Comments.findAll({
            where: { videoId, parent: parent || null },
            include: [{
                model: Users, foreignKey: 'owner', attributes: { exclude: ['password'] }, include: [{ model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] } }]
            }]
        })
        res.send(comments);
    } catch (err) {
        res.sendStatus(400);
    }
})

export default router;
